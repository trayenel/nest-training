import { RoleDTO } from '../../roles/dto/RoleDTO';

export class UserResponseDTO {
  userId: string;
  name: string;
  email: string;
  roles?: RoleDTO[];
}
