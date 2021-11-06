import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Categoryb } from './categoryb.entity';

@Entity()
export class Questionb extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Categoryb, (categoryb) => categoryb.questions)
  @JoinTable()
  categories: Categoryb[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
