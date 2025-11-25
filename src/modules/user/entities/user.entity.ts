import { Role } from 'src/modules/role/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role_id: number;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
