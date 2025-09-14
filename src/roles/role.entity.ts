import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActionEntity } from '../actions/action.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  roleId: string;

  @Column('varchar', { length: 10, name: 'name' })
  name: string;

  @ManyToMany(() => ActionEntity)
  @JoinTable({
    name: 'role_action',
    joinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
    inverseJoinColumn: { name: 'action_id', referencedColumnName: 'actionId' },
  })
  actions: ActionEntity[];
}
