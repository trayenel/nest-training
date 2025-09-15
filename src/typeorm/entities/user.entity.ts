import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity.js';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  userId: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @Column('varchar', { name: 'password', length: 50 })
  password: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'userId' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
  })
  roles: RoleEntity[];
}
