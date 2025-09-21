import { RoleEntity } from './role.entity';
export declare class UserEntity {
    userUUID: string;
    name: string;
    email: string;
    password: string;
    roles: RoleEntity[];
}
