import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  // @IsNumber()
  // id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
