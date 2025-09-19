import { Entity, PrimaryColumn } from 'typeorm';

@Entity('user_role')
export class UserRoleEntity {
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @PrimaryColumn('uuid', { name: 'role_id' })
  roleId: string;
}
