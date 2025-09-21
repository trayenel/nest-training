import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('action')
export class ActionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  actionUUID: string;

  @Column('varchar', { name: 'name', length: 25 })
  name: string;

  @Column('varchar', { name: 'description', length: 25 })
  description: string;
}
