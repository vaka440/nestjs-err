import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Userd } from './userd.entity';
import { Image } from './image.entity';

@Entity()
export class Post extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userd_id: number;

  @ManyToOne(() => Userd)
  @JoinColumn({ name: 'userd_id', referencedColumnName: 'id' })
  userd: Userd;

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];
}
