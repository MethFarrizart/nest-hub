import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
export class CreateUserDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @Exclude() // hide
  password: string;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
