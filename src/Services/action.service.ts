import { Injectable, NotFoundException } from '@nestjs/common';
import ActionDTO from '../DTO/ActionDTO';
import { actions } from '../dummydata';

@Injectable()
export class ActionService {
  actions: Map<string, ActionDTO>;

  constructor() {
    this.actions = new Map();

    for (const i of actions as Array<ActionDTO>) {
      this.createAction(i);
    }
  }

  getAllActions(): Record<string, ActionDTO> {
    const actions: Record<string, ActionDTO> = {};

    this.actions.forEach((action) => {
      actions[action.id] = action;
    });

    return actions;
  }

  getActionById(id: string): ActionDTO {
    const action: ActionDTO | undefined = this.actions.get(id);

    if (action) {
      return action;
    } else {
      throw new NotFoundException();
    }
  }

  deleteActionById(id: string): void {
    this.actions.delete(id);
  }

  createAction(action: ActionDTO): void {
    const id: string = Math.random().toString(36).slice(2, 10);

    action.id = id;

    this.actions.set(id, action);
  }

  updateAction(id: string, newAction: ActionDTO): ActionDTO {
    const action: ActionDTO | undefined = this.getActionById(id);
    const updatedAction: ActionDTO | undefined = { ...newAction };
    updatedAction.id = id;

    if (action) {
      for (const key of Object.keys(action)) {
        if (!(key in updatedAction)) {
          updatedAction[key] = null;
        }
      }
      this.actions.set(id, updatedAction);
    } else {
      throw new NotFoundException();
    }
    return this.getActionById(id);
  }

  patchAction(id: string, newAction: ActionDTO): ActionDTO {
    const action: ActionDTO | undefined = this.getActionById(id);

    if (action) {
      const updatedAction: ActionDTO | undefined = { ...action, ...newAction };
      this.actions.set(id, updatedAction);
    } else {
      throw new NotFoundException();
    }
    return this.getActionById(id);
  }
}
