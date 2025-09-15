import { RoleDTO } from '../../roles/dto/RoleDTO.js';

export class UserResponseDTO {
  userId: string;
  name: string;
  email: string;
  roles?: RoleDTO[];
}
