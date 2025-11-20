import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const { username, password } = dto;
    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException(process.env.INVALID_USER);
    }

    const user_password = (await bcrypt.compare(
      password,
      user?.password,
    )) as string;

    if (!user_password) {
      throw new UnauthorizedException(process.env.INVALID_USER);
    }
    const payload = { id: user.id, username: user.username };
    return {
      user: user,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    dto: CreateUserDto,
  ): Promise<{ user: User; token: string } | null> {
    const { username, password, role_id } = dto;

    const salt = await bcrypt.genSalt(10);
    const hashPW = await bcrypt.hash(password, salt);

    const existUser = await this.userRepo.findOne({ where: { username } });

    if (existUser) {
      return null;
    }

    const userData = this.userRepo.create({
      username,
      password: hashPW,
      role_id,
    });

    const savedUser = await this.userRepo.save(userData);

    const token = jwt.sign(
      { id: savedUser.id, username: savedUser.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    ) as string;

    return { user: savedUser, token };
  }

  async logout(body: any) {}
}
