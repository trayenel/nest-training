import ActionDTO from '../../actions/dto/ActionDTO';

export interface RoleDTO {
  id?: string;
  name: string;
  actions?: ActionDTO[];
}
