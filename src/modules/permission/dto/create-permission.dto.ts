import { IsNumber, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreatePermissionDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  role_id: number;

  @IsString()
  permission_name: string;

  @IsString()
  description: string;
}
