import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateRoleDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  role_name: string;

  @IsString()
  description: string;
}
