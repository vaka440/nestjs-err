import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Categoryc } from './Categoryc.entity';

@Entity()
export class Questionc extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Categoryc, (Categoryc) => Categoryc.questions)
  @JoinTable()
  categories: Categoryc[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
