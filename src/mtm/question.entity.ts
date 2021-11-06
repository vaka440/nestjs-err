import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Question extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Category, (category) => category.questions) // par defaut : Lazy loading
  @JoinTable()
  categories: Category[];

  /*
  @ManyToMany((type) => Category, (category) => category.questions, {
    eager: true,    // questions will be loaded with its categories 
  })                // Eager relations only work when you use find* methods. 
  @JoinTable()      // If you use QueryBuilder eager relations are disabled and have to use leftJoinAndSelect to load the relation. 
  categories: Category[];
  */
}
