import { Entity, PrimaryColumn } from 'typeorm';

@Entity('role_action')
export class RoleActionEntity {
  @PrimaryColumn('uuid', { name: 'role_id' })
  roleUUID: string;

  @PrimaryColumn('uuid', { name: 'action_id' })
  actionUUID: string;
}
