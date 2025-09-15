import ActionDTO from '../../actions/dto/ActionDTO.js';

export interface RoleDTO {
  id?: string;
  name: string;
  actions?: ActionDTO[];
}
