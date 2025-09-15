import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './dto/RoleDTO';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles(): Promise<RoleDTO[]> {
    return await this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<RoleDTO> {
    return await this.roleService.getRoleById(id);
  }
}
