import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ActionRequestDTO from './dto/ActionRequestDTO';
import { DeleteResult, Repository } from 'typeorm';
import { ActionEntity } from './action.entity';

@Injectable()
export class ActionService {
  actions: Map<string, ActionRequestDTO>;

  constructor(
    @Inject('ACTION_REPOSITORY')
    private readonly actionRepository: Repository<ActionEntity>,
  ) {}

  async getAllActions(): Promise<ActionEntity[]> {
    return await this.actionRepository.find();
  }

  async getActionById(id: string): Promise<ActionEntity> {
    const action: ActionEntity | null = await this.actionRepository.findOne({
      where: { id: id },
    });

    if (action) {
      return action;
    } else {
      throw new NotFoundException();
    }
  }

  async deleteActionById(id: string): Promise<{ message: string }> {
    const deleteResult: DeleteResult = await this.actionRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException();
    }

    return { message: `Deleted action with id ${id}` };
  }

  async createAction(action: ActionRequestDTO): Promise<ActionEntity> {
    const actionEntity: ActionEntity = this.actionRepository.create(action);

    return await this.actionRepository.save(actionEntity);
  }

  async updateAction(id: string, newAction: ActionRequestDTO): Promise<ActionEntity> {
    const oldAction: ActionEntity = await this.getActionById(id);

    const updatedAction: ActionEntity = this.actionRepository.merge(
      oldAction,
      newAction,
    );

    return this.actionRepository.save(updatedAction);
  }

  async patchAction(
    id: string,
    newAction: Partial<ActionRequestDTO>,
  ): Promise<ActionEntity> {
    const oldAction: ActionEntity = await this.getActionById(id);

    const updatedAction: ActionEntity = this.actionRepository.merge(
      oldAction,
      newAction,
    );

    return this.actionRepository.save(updatedAction);
  }
}
