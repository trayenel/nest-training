import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RoleDTO } from './dto/RoleDTO.js';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../typeorm/entities/role.entity.js';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private roleRepository: Repository<RoleEntity>,
  ) {}

  async getAllRoles(): Promise<RoleDTO[]> {
    return await this.roleRepository.find();
  }

  async getRoleById(id: string): Promise<RoleDTO> {
    const role: RoleEntity | null = await this.roleRepository.findOne({
      where: { roleId: id },
      relations: ['actions'],
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    console.log(role);

    return role;
  }
}
