import { Repository } from 'typeorm';
import { ActionEntity } from '../../typeorm/entities/action.entity.js';
import { ActionDto } from './dto/action.dto.js';
import { ActionUpdateDTO } from './dto/action-update.dto';
export declare class ActionService {
    private readonly actionRepository;
    constructor(actionRepository: Repository<ActionEntity>);
    getAllActions(): Promise<ActionDto[]>;
    getActionById(id: string): Promise<ActionDto>;
    createAction(action: ActionDto): Promise<ActionDto>;
    updateAction(id: string, newAction: ActionUpdateDTO): Promise<ActionDto>;
    patchAction(id: string, partialAction: Partial<ActionUpdateDTO>): Promise<ActionEntity>;
    deleteActionById(id: string): Promise<{
        message: string;
    }>;
}
