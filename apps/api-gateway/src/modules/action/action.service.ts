import { Inject, Injectable } from '@nestjs/common';
import {
  RpcErrorResponseDto,
  ResponseMessageDto,
  ActionDto,
  ActionUpdateDTO,
} from '@nest-training/shared';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ActionService {
  constructor(
    @Inject('USER_MANAGEMENT_SERVICE')
    private readonly userManagementClient: ClientProxy,
  ) {}

  async getActionByName(username: string): Promise<ActionDto> {
    const pattern = { cmd: 'getActionByName' };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, username),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ActionDto;
  }

  async getActionByEmail(email: string): Promise<ActionDto> {
    const pattern = { cmd: 'getActionByEmail' };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, email),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ActionDto;
  }

  async createAction(action: ActionDto): Promise<ActionDto> {
    const pattern = { cmd: 'createAction' };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, action),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ActionDto;
  }

  async getAllActions(): Promise<ActionDto[]> {
    const pattern = { cmd: 'getAllActions' };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, {}),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ActionDto[];
  }

  async getActionByUUID(actionUUID: string): Promise<ActionDto> {
    const pattern = { cmd: 'getActionByUUID' };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, actionUUID),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ActionDto;
  }

  async deleteActionByUUID(actionUUID: string): Promise<ResponseMessageDto> {
    const pattern = { cmd: 'deleteActionByUUID' };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, actionUUID),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ResponseMessageDto;
  }

  async addActionRole(
    actionUUID: string,
    roleUUID: string,
  ): Promise<ResponseMessageDto> {
    const pattern = { cmd: 'addActionRole' };
    const data = { actionUUID, roleUUID };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, data),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ResponseMessageDto;
  }

  async updateAction(
    actionUUID: string,
    action: ActionUpdateDTO,
  ): Promise<ActionDto> {
    const pattern = { cmd: 'updateAction' };
    const data = { actionUUID, action };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, data),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ActionDto;
  }

  async patchAction(
    actionUUID: string,
    action: Partial<ActionUpdateDTO>,
  ): Promise<ActionDto> {
    const pattern = { cmd: 'patchAction' };
    const data = { actionUUID, action };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, data),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ActionDto;
  }

  async removeActionRole(
    actionUUID: string,
    roleUUID: string,
  ): Promise<ResponseMessageDto> {
    const pattern = { cmd: 'removeActionRole' };
    const data = { actionUUID, roleUUID };
    return (await lastValueFrom(
      this.userManagementClient.send(pattern, data),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as ResponseMessageDto;
  }
}
