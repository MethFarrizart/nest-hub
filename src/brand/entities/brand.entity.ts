import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  age: number;
}
