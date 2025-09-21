import { RoleDto } from '../../roles/dto/role.dto.js';
export declare class UserResponseDto {
    userId?: string;
    name: string;
    email: string;
    roles?: RoleDto[];
}
