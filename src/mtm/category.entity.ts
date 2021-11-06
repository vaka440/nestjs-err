import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Category extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Question, (question) => question.categories)
  questions: Question[];
}
