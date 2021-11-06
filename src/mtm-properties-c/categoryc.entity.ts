import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostToCategory } from './post-to-category.entity';
import { Questionc } from './Questionc.entity';

@Entity()
export class Categoryc extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Questionc, (Questionc) => Questionc.categories)
  questions: Questionc[];

  @OneToMany(() => PostToCategory, (postToCategory) => postToCategory.categoryc)
  public postToCategories!: PostToCategory[];
}
