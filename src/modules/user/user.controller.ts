import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { Response } from 'express';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // apply this decorator @Throttle() will work only for method in controller we want
  @Throttle(5, 60) // 5times, 60seconds
  @Post('login')
  async login(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const auth = await this.userService.login(dto);

    res.cookie('token', auth.token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
      sameSite: 'lax'
    });

    //  return plain object (ClassSerializerInterceptor will serialize)
    return {
      message: 'Login successful',
      user: auth.user,
      token: auth.token,
      Status: HttpStatus.OK,
    };
  }

  @SkipThrottle()
  @Post('register')
  async create(@Body() dto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.register(dto);

    if (!user) {
      return res
        .status(HttpStatus.NOT_IMPLEMENTED)
        .send({ message: 'User Already Exist' });
    }

    res.cookie('token', user.token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json({
      message: 'Created Successfully!',
      user: user.user,
      token: user.token,
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
    });

    return { message: 'Logged out' };
  }
}
