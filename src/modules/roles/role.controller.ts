import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service.js';
import { RoleDto } from './dto/role.dto.js';
import { RequireAction } from '../../shared/decorators/actions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActionsEnum } from '../../shared/models/enums/actions.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { ActionService } from '../actions/action.service';
import { ActionDto } from '../actions/dto/action.dto';
import { RoleActionDto } from './dto/roleAction.dto';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly actionService: ActionService,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.READ_ROLE)
  @Get('/')
  async getAllRoles(): Promise<RoleDto[]> {
    return await this.roleService.getAllRoles();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.READ_ROLE)
  @Get(':roleId')
  async getRoleById(@Param('roleId') roleId: string): Promise<RoleDto> {
    return await this.roleService.getRoleById(roleId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.CREATE_ROLE)
  @Get(':roleId')
  async createRole(@Body() newRole: RoleDto): Promise<RoleDto> {
    return await this.roleService.createRole(newRole);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.UPDATE_ROLE)
  @Get(':roleId')
  async updateRole(
    @Param('roleId') roleId: string,
    @Body() modifiedRole: RoleDto,
  ): Promise<RoleDto> {
    return await this.roleService.updateRole(roleId, modifiedRole);
  }

  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':roleId/action/:actionId')
  async addRoleAction(
    @Param('roleId') roleId: string,
    @Param('actionId') actionId: string,
  ): Promise<RoleActionDto> {
    const action: ActionDto = await this.actionService.getActionById(actionId);

    if (!action) {
      throw new BadRequestException('Action Not Found');
    }

    return await this.roleService.addRoleAction(roleId, actionId);
  }

  @Delete(':roleId/action/:actionId')
  async removeRoleAction(
    @Param('roleId') roleId: string,
    @Param('actionId') actionId: string,
  ): Promise<{ message: string }> {
    const action: ActionDto = await this.actionService.getActionById(actionId);

    if (!action) {
      throw new BadRequestException('Action Not Found');
    }

    return await this.roleService.removeRoleAction(roleId, actionId);
  }
}
