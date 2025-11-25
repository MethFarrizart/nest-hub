import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
export class CreateUserDto {
  @Expose()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;

  @Exclude() // hide
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  role_id: number;

  @Expose()
  role_name: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
