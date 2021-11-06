import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Postc } from './postc.entity';
import { Categoryc } from './categoryc.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class PostToCategory extends EntityHelper {
  @PrimaryGeneratedColumn()
  public postToCategoryId!: number;

  @Column()
  public postcId!: number;

  @Column()
  public categorycId!: number;

  @Column()
  public order!: number;

  @ManyToOne(() => Postc, (postc) => postc.postToCategories)
  public postc!: Postc;

  @ManyToOne(() => Categoryc, (categoryc) => categoryc.postToCategories)
  public categoryc!: Categoryc;
}
