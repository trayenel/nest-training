import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActionService } from './action.service';
import {
  ActionDto,
  ActionsEnum,
  ActionUpdateDTO,
  RequireAction,
  ResponseMessageDto,
} from '@nest-training/shared';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/')
  @RequireAction(ActionsEnum.READ_ACTION)
  async getAllActions(): Promise<ActionDto[]> {
    return await this.actionService.getAllActions();
  }

  @Get('/:actionUUID')
  @RequireAction(ActionsEnum.READ_ACTION)
  async getActionByUUID(
    @Param('actionUUID') actionUUID: string,
  ): Promise<ActionDto> {
    return await this.actionService.getActionByUUID(actionUUID);
  }

  @Post('/')
  @RequireAction(ActionsEnum.CREATE_ACTION)
  async createAction(@Body() action: ActionDto): Promise<ActionDto> {
    return await this.actionService.createAction(action);
  }

  @Put('/:actionUUID')
  @RequireAction(ActionsEnum.UPDATE_ACTION)
  async updateAction(
    @Param('actionUUID') actionUUID: string,
    @Body() action: ActionUpdateDTO,
  ): Promise<ActionDto> {
    return await this.actionService.updateAction(actionUUID, action);
  }

  @Patch('/:actionUUID')
  @RequireAction(ActionsEnum.UPDATE_ACTION)
  async patchAction(
    @Param('actionUUID') actionUUID: string,
    @Body() action: Partial<ActionUpdateDTO>,
  ): Promise<ActionDto> {
    return await this.actionService.patchAction(actionUUID, action);
  }

  @Delete('/:actionUUID')
  @RequireAction(ActionsEnum.DELETE_ACTION)
  async deleteActionByUUID(
    @Param('actionUUID') actionUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.actionService.deleteActionByUUID(actionUUID);
  }
}
