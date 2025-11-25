import { Role } from 'src/modules/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // role_id: number;

  @Column()
  permission_name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
