import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Questionb } from './questionb.entity';

@Entity()
export class Categoryb extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Questionb, (questionb) => questionb.categories)
  questions: Questionb[];
}
