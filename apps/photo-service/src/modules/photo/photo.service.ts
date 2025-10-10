import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ActionDto,
  ActionEntity,
  ActionUpdateDTO,
  ResponseMessageDto,
  RpcErrorResponseDto,
} from '@nest-training/shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>,
  ) {}

  async getAllActions(): Promise<ActionDto[]> {
    const actions: ActionEntity[] = await this.actionRepository.find();

    if (!actions || actions.length === 0) {
      const error: RpcErrorResponseDto = {
        message: 'No actions found',
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(error);
    }

    return actions;
  }

  async getActionByUUID(uuid: string): Promise<ActionDto> {
    const action: ActionEntity | null = await this.actionRepository.findOneBy({
      actionUUID: uuid,
    });

    if (!action) {
      const error: RpcErrorResponseDto = {
        message: `Action with ID ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(error);
    }

    return action;
  }

  async createAction(action: ActionDto): Promise<ActionDto> {
    const existingAction = await this.actionRepository.findOne({
      where: { name: action.name },
    });

    if (existingAction) {
      const error: RpcErrorResponseDto = {
        message: `Action ${existingAction.name} already exists`,
        error: 'Conflict',
        statusCode: 409,
      };
      throw new RpcException(error);
    }

    const newAction = this.actionRepository.create(action);
    return await this.actionRepository.save(newAction);
  }

  async updateAction(
    uuid: string,
    newAction: ActionUpdateDTO,
  ): Promise<ActionDto> {
    const existingAction = await this.actionRepository.findOneBy({
      actionUUID: uuid,
    });

    if (!existingAction) {
      const error: RpcErrorResponseDto = {
        message: `Action with uuid ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(error);
    }

    const updatedAction = this.actionRepository.merge(
      existingAction,
      newAction,
    );
    return await this.actionRepository.save(updatedAction);
  }

  async patchAction(
    uuid: string,
    partialAction: Partial<ActionUpdateDTO>,
  ): Promise<ActionDto> {
    const existingAction = await this.actionRepository.findOneBy({
      actionUUID: uuid,
    });

    if (!existingAction) {
      const error: RpcErrorResponseDto = {
        message: `Action with uuid ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(error);
    }

    const updatedAction = this.actionRepository.merge(
      existingAction,
      partialAction,
    );
    return await this.actionRepository.save(updatedAction);
  }

  async deleteActionByUUID(uuid: string): Promise<ResponseMessageDto> {
    const result: DeleteResult = await this.actionRepository.delete({
      actionUUID: uuid,
    });

    if (!result.affected) {
      const error: RpcErrorResponseDto = {
        message: `Action with ID ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(error);
    }

    return {
      message: `Action with UUID ${uuid} deleted successfully`,
      statusCode: 200,
    };
  }
}
