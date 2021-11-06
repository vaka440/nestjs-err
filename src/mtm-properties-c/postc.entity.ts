import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { PostToCategory } from './post-to-category.entity';

@Entity()
export class Postc extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => PostToCategory, (postToCategory) => postToCategory.postc)
  public postToCategories!: PostToCategory[];
}
