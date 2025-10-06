import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ActionDto,
  ActionUpdateDTO,
  ResponseMessageDto,
} from '@nest-training/shared';
import { ActionService } from './action.service';

@Controller()
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @MessagePattern({ cmd: 'getAllActions' })
  async getAllActions(): Promise<ActionDto[]> {
    return await this.actionService.getAllActions();
  }

  @MessagePattern({ cmd: 'getActionByUUID' })
  async getActionByUUID(@Payload() actionUUID: string): Promise<ActionDto> {
    return await this.actionService.getActionByUUID(actionUUID);
  }

  @MessagePattern({ cmd: 'createAction' })
  async createAction(@Payload() action: ActionDto): Promise<ActionDto> {
    return await this.actionService.createAction(action);
  }

  @MessagePattern({ cmd: 'updateAction' })
  async updateAction(
    @Payload() data: { actionUUID: string; action: ActionUpdateDTO },
  ): Promise<ActionDto> {
    return await this.actionService.updateAction(data.actionUUID, data.action);
  }

  @MessagePattern({ cmd: 'patchAction' })
  async patchAction(
    @Payload() data: { actionUUID: string; action: Partial<ActionUpdateDTO> },
  ): Promise<ActionDto> {
    return await this.actionService.patchAction(data.actionUUID, data.action);
  }

  @MessagePattern({ cmd: 'deleteActionByUUID' })
  async deleteActionByUUID(
    @Payload() actionUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.actionService.deleteActionByUUID(actionUUID);
  }
}
