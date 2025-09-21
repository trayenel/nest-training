import { RoleService } from './role.service';
import { ActionService } from '../actions/action.service';
import { RoleDto } from './dto/role.dto';
import { RoleActionDto } from './dto/roleAction.dto';
export declare class RoleController {
    private readonly roleService;
    private readonly actionService;
    constructor(roleService: RoleService, actionService: ActionService);
    getAllRoles(): Promise<RoleDto[]>;
    getRoleById(roleUUID: string): Promise<RoleDto>;
    createRole(newRole: RoleDto): Promise<RoleDto>;
    updateRole(roleUUID: string, modifiedRole: RoleDto): Promise<RoleDto>;
    addRoleAction(roleUUID: string, actionUUID: string): Promise<RoleActionDto>;
    removeRoleAction(roleUUID: string, actionUUID: string): Promise<{
        message: string;
    }>;
    deleteRole(roleUUID: string): Promise<void>;
}
