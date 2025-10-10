import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  userUUID: string;

  @Column('varchar', { name: 'username', length: 50 })
  username: string;

  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @Column('varchar', { name: 'password', length: 50 })
  password: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'userUUID' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'roleUUID' },
  })
  roles: RoleEntity[];
}
