import { ActionDto } from '../../actions/dto/action.dto.js';

export class RoleDto {
  id?: string;
  name: string;
  actions?: ActionDto[];
}
