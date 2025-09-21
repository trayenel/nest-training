import { ActionUpdateDTO } from './dto/action-update.dto';
import { ActionService } from './action.service';
import { ActionDto } from './dto/action.dto';
export declare class ActionController {
    private readonly actionService;
    constructor(actionService: ActionService);
    getAllActions(): Promise<ActionDto[]>;
    getActionById(id: string): Promise<ActionDto>;
    createAction(newAction: ActionDto): Promise<ActionDto>;
    updateAction(id: string, actionDTO: ActionUpdateDTO): Promise<ActionDto>;
    patchAction(id: string, actionDTO: ActionUpdateDTO): Promise<ActionDto>;
    deleteActionById(id: string): Promise<{
        message: string;
    }>;
}
