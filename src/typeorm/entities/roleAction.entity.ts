import { Entity, PrimaryColumn } from 'typeorm';

@Entity('role_action')
export class RoleActionEntity {
  @PrimaryColumn('uuid', { name: 'role_id' })
  roleId: string;

  @PrimaryColumn('uuid', { name: 'action_id' })
  actionId: string;
}
