import { RequireAction } from '@nest-training/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ActionService } from '../actions/action.service';
import { ActionsEnum } from '@nest-training/shared';
import { RoleDto } from '@nest-training/shared';
import { RoleActionDto } from '@nest-training/shared';
import { ActionDto } from '@nest-training/shared';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly actionService: ActionService,
  ) {}

  @RequireAction(ActionsEnum.READ_ROLE)
  @Get('/')
  async getAllRoles(): Promise<RoleDto[]> {
    return await this.roleService.getAllRoles();
  }

  @RequireAction(ActionsEnum.READ_ROLE)
  @Get(':roleUUID')
  async getRoleById(@Param('roleUUID') roleUUID: string): Promise<RoleDto> {
    return await this.roleService.getRoleById(roleUUID);
  }

  @RequireAction(ActionsEnum.CREATE_ROLE)
  @Post('/')
  async createRole(@Body() newRole: RoleDto): Promise<RoleDto> {
    return await this.roleService.createRole(newRole);
  }

  @RequireAction(ActionsEnum.UPDATE_ROLE)
  @Post(':roleUUID')
  async updateRole(
    @Param('roleUUID', ParseUUIDPipe) roleUUID: string,
    @Body() modifiedRole: RoleDto,
  ): Promise<RoleDto> {
    return await this.roleService.updateRole(roleUUID, modifiedRole);
  }

  @Post(':roleUUID/action/:actionUUID')
  async addRoleAction(
    @Param('roleUUID', ParseUUIDPipe) roleUUID: string,
    @Param('actionUUID', ParseUUIDPipe) actionUUID: string,
  ): Promise<RoleActionDto> {
    const action: ActionDto =
      await this.actionService.getActionById(actionUUID);

    if (!action) {
      throw new BadRequestException('Action Not Found');
    }

    return await this.roleService.addRoleAction(roleUUID, actionUUID);
  }

  @Delete(':roleUUID/action/:actionUUID')
  async removeRoleAction(
    @Param('roleUUID', ParseUUIDPipe) roleUUID: string,
    @Param('actionUUID', ParseUUIDPipe) actionUUID: string,
  ): Promise<{ message: string }> {
    const action: ActionDto =
      await this.actionService.getActionById(actionUUID);

    if (!action) {
      throw new BadRequestException('Action Not Found');
    }

    return await this.roleService.removeRoleAction(roleUUID, actionUUID);
  }

  @RequireAction(ActionsEnum.DELETE_ROLE)
  @Delete(':roleUUID')
  async deleteRole(
    @Param('roleUUID', ParseUUIDPipe) roleUUID: string,
  ): Promise<void> {
    await this.roleService.deleteRole(roleUUID);
  }
}
