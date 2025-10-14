import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  photoUUID: string;

  @Column({type: 'varchar', length: 255, name: 'file_path', unique: true, nullable: false})
  filePath: string;

  @Column({type: 'uuid', name: 'user_id', nullable: false})
  user_id: string;
}