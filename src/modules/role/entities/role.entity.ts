import { Permission } from 'src/modules/permission/entities/permission.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}
