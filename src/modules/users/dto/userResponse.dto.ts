import { RoleDto } from '../../roles/dto/role.dto.js';

export class UserResponseDto {
  userId: string;
  name: string;
  email: string;
  roles?: RoleDto[];
}
