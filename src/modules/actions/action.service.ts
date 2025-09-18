import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { ActionEntity } from '../../typeorm/entities/action.entity.js';
import { ActionDto } from './dto/action.dto.js';
import { RoleEntity } from '../../typeorm/entities/role.entity';

@Injectable()
export class ActionService {
  constructor(
    @Inject('ACTION_REPOSITORY')
    private readonly actionRepository: Repository<ActionEntity>,
  ) {}

  async getAllActions(): Promise<ActionDto[]> {
    return (await this.actionRepository.find()) as ActionDto[];
  }

  async getActionById(id: string): Promise<ActionDto> {
    const action: ActionEntity | null = await this.actionRepository.findOneBy({
      actionId: id,
    });

    if (action) {
      return action;
    } else {
      throw new NotFoundException();
    }
  }

  async createAction(action: ActionDto): Promise<ActionDto> {
    const existingAction: ActionEntity | null =
      await this.actionRepository.findOne({
        where: { name: action.name },
      });

    if (existingAction) {
      throw new HttpException(
        `Role ${existingAction.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const actionEntity: ActionEntity = this.actionRepository.create(action);

    return await this.actionRepository.save(actionEntity);
  }

  async updateAction(id: string, newAction: ActionDto): Promise<ActionDto> {
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
  //   newAction: Partial<ActionDto>,
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
