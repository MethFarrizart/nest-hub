import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('store')
  async create(@Body() dto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(dto);

    if (!user) {
      return res
        .status(HttpStatus.NOT_IMPLEMENTED)
        .send({ message: 'User Already Exist' });
    }

    res.cookie('token', user.token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(HttpStatus.OK).json({
      message: 'Created Successfully!',
      user: user.user,
      token: user.token,
    });
  }
}
