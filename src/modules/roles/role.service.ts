import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleDto } from './dto/role.dto.js';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../typeorm/entities/role.entity.js';
import { RoleActionDto } from './dto/roleAction.dto';
import { ActionEntity } from '../../typeorm/entities/action.entity';
import { RoleActionEntity } from '../../typeorm/entities/roleAction.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private roleRepository: Repository<RoleEntity>,
    @Inject('ROLEACTION_REPOSITORY')
    private roleActionRepository: Repository<RoleActionEntity>,
  ) {}

  async getAllRoles(): Promise<RoleDto[]> {
    return await this.roleRepository.find({ relations: ['actions'] });
  }

  async getRoleById(id: string): Promise<RoleDto> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleId: id },
      relations: ['actions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return role;
  }

  async createRole(createRoleDto: RoleDto): Promise<RoleDto> {
    const roleEntity: RoleEntity = this.roleRepository.create(createRoleDto);

    return await this.roleRepository.save(roleEntity);
  }

  async updateRole(id: string, updatedRole: RoleDto): Promise<RoleDto> {
    const roleEntity: RoleEntity | null = await this.roleRepository.findOneBy({
      roleId: id,
    });

    if (!roleEntity) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    const updatedUser: RoleEntity = this.roleRepository.merge(
      roleEntity,
      updatedRole,
    );

    return await this.roleRepository.save(updatedUser);
  }

  async addRoleAction(
    roleId: string,
    actionId: string,
  ): Promise<RoleActionDto> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleId: roleId },
      relations: ['actions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    role.actions.forEach((curAction: ActionEntity): void => {
      if (curAction.actionId === actionId) {
        throw new BadRequestException(
          `Action ${curAction.name} already exists on role ${role.name}`,
        );
      }
    });

    const roleActionEntity: RoleActionEntity = this.roleActionRepository.create(
      { roleId: role.roleId, actionId: actionId },
    );

    return await this.roleActionRepository.save(roleActionEntity);
  }

  async removeRoleAction(
    roleId: string,
    actionId: string,
  ): Promise<{ message: string }> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleId: roleId },
      relations: ['actions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    for (const curAction of role.actions) {
      if (curAction.actionId === actionId) {
        await this.roleActionRepository.delete({
          roleId: roleId,
          actionId: actionId,
        });
        return {
          message: `Action ${curAction.name} removed from role ${role.name}`,
        };
      }
    }

    throw new NotFoundException(
      `Action with id ${roleId} not found on role ${role.name}`,
    );
  }
}
