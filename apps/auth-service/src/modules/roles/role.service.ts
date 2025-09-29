import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleEntity } from '../../typeorm/entities/role.entity';
import { RoleActionEntity } from '../../typeorm/entities/roleAction.entity';
import { RoleDto } from './dto/role.dto';
import { RoleActionDto } from './dto/roleAction.dto';
import { ActionEntity } from '../../typeorm/entities/action.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,

    @InjectRepository(RoleActionEntity)
    private roleActionRepository: Repository<RoleActionEntity>,
  ) {}

  async getAllRoles(): Promise<RoleDto[]> {
    return await this.roleRepository.find({ relations: ['actions'] });
  }

  async getRoleById(id: string): Promise<RoleDto> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleUUID: id },
      relations: ['actions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return role;
  }

  async createRole(createRoleDto: RoleDto): Promise<RoleDto> {
    const existingRole: RoleEntity | null = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });

    if (existingRole) {
      throw new HttpException(
        `Role ${existingRole.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const roleEntity: RoleEntity = this.roleRepository.create(createRoleDto);

    return await this.roleRepository.save(roleEntity);
  }

  async updateRole(id: string, updatedRole: RoleDto): Promise<RoleDto> {
    const roleEntity: RoleEntity | null = await this.roleRepository.findOneBy({
      roleUUID: id,
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
    roleUUID: string,
    actionId: string,
  ): Promise<RoleActionDto> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleUUID: roleUUID },
      relations: ['actions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${roleUUID} not found`);
    }

    role.actions.forEach((curAction: ActionEntity): void => {
      if (curAction.actionUUID === actionId) {
        throw new BadRequestException(
          `Action ${curAction.name} already exists on role ${role.name}`,
        );
      }
    });

    const roleActionEntity: RoleActionEntity = this.roleActionRepository.create(
      { roleUUID: role.roleUUID, actionUUID: actionId },
    );

    return await this.roleActionRepository.save(roleActionEntity);
  }

  async removeRoleAction(
    roleUUID: string,
    actionId: string,
  ): Promise<{ message: string }> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleUUID: roleUUID },
      relations: ['actions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${roleUUID} not found`);
    }

    for (const curAction of role.actions) {
      if (curAction.actionUUID === actionId) {
        await this.roleActionRepository.delete({
          roleUUID: roleUUID,
          actionUUID: actionId,
        });
        return {
          message: `Action ${curAction.name} removed from role ${role.name}`,
        };
      }
    }

    throw new NotFoundException(
      `Action with id ${roleUUID} not found on role ${role.name}`,
    );
  }

  async deleteRole(roleUUID: string): Promise<void> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleUUID: roleUUID },
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${roleUUID} not found`);
    }

    await this.roleRepository.delete(roleUUID);
  }
}
