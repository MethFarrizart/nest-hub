import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  age: number;
}
