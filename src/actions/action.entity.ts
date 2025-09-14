import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('action')
export class ActionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  actionId: string;

  @Column('varchar', { name: 'name', length: 25 })
  name: string;
}
