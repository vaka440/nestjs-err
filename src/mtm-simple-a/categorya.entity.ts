import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categorya extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
