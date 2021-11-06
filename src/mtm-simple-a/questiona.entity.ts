import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Categorya } from './categorya.entity';

@Entity()
export class Questiona extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Categorya)
  @JoinTable()
  categories: Categorya[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
