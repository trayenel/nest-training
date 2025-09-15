import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ActionDTO from './dto/ActionDTO.js';
import { DeleteResult, Repository } from 'typeorm';
import { ActionEntity } from '../../typeorm/entities/action.entity.js';
import actionDTO from './dto/ActionDTO.js';

@Injectable()
export class ActionService {
  constructor(
    @Inject('ACTION_REPOSITORY')
    private readonly actionRepository: Repository<ActionEntity>,
  ) {}

  async getAllActions(): Promise<ActionDTO[]> {
    return (await this.actionRepository.find()) as ActionDTO[];
  }

  async getActionById(id: string): Promise<ActionDTO> {
    const action: ActionEntity | null = await this.actionRepository.findOneBy({
      actionId: id,
    });

    if (action) {
      return action;
    } else {
      throw new NotFoundException();
    }
  }

  async createAction(action: ActionDTO): Promise<ActionDTO> {
    const actionEntity: ActionEntity = this.actionRepository.create(action);

    return await this.actionRepository.save(actionEntity);
  }

  async updateAction(id: string, newAction: actionDTO): Promise<actionDTO> {
    const oldAction: ActionEntity | null =
      await this.actionRepository.findOneBy({ actionId: id });

    if (!oldAction) {
      throw new NotFoundException();
    }

    const updatedAction: ActionEntity = this.actionRepository.merge(
      oldAction,
      newAction,
    );

    return this.actionRepository.save(updatedAction);
  }
  //
  // async patchAction(
  //   id: string,
  //   newAction: Partial<ActionDTO>,
  // ): Promise<ActionEntity> {
  //   const oldAction: ActionEntity = await this.getActionById(id);
  //
  //   const updatedAction: ActionEntity = this.actionRepository.merge(
  //     oldAction,
  //     newAction,
  //   );
  //
  //   return this.actionRepository.save(updatedAction);
  // }

  async deleteActionById(id: string): Promise<{ message: string }> {
    const deleteResult: DeleteResult = await this.actionRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException();
    }

    return { message: `Deleted action with id ${id}` };
  }
}
