import { Repository } from 'typeorm';
import { RoleEntity } from '../../typeorm/entities/role.entity';
import { RoleActionEntity } from '../../typeorm/entities/roleAction.entity';
import { RoleDto } from './dto/role.dto';
import { RoleActionDto } from './dto/roleAction.dto';
export declare class RoleService {
    private roleRepository;
    private roleActionRepository;
    constructor(roleRepository: Repository<RoleEntity>, roleActionRepository: Repository<RoleActionEntity>);
    getAllRoles(): Promise<RoleDto[]>;
    getRoleById(id: string): Promise<RoleDto>;
    createRole(createRoleDto: RoleDto): Promise<RoleDto>;
    updateRole(id: string, updatedRole: RoleDto): Promise<RoleDto>;
    addRoleAction(roleUUID: string, actionId: string): Promise<RoleActionDto>;
    removeRoleAction(roleUUID: string, actionId: string): Promise<{
        message: string;
    }>;
    deleteRole(roleUUID: string): Promise<void>;
}
