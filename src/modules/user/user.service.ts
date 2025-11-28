import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private dataSource: DataSource,
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

    const finalUser = await this.dataSource.query<User>(
      `SELECT USER.*, role.role_name from USER INNER JOIN role on role.id = USER.role_id WHERE USER.id = ${user.id}`,
    );

    // console.log(finalUser[0]);

    const payload = { 
      id: finalUser[0].id, 
      username: finalUser[0].username,
      role_name: finalUser[0].role_name,
    };

    const userDto = plainToInstance(CreateUserDto, finalUser, {
      excludeExtraneousValues: true,
    });

    console.log(userDto);

    const token = await this.jwtService.signAsync(payload);

    return {
      user: finalUser,
      token
    };
  }

  async register(
    dto: CreateUserDto,
  ): Promise<{ user: CreateUserDto; token: string } | null> {
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

    const userDto = plainToInstance(CreateUserDto, savedUser, {
      excludeExtraneousValues: true,
    });

    const token = jwt.sign(
      { id: userDto.id, username: userDto.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    ) as string;

    return { user: userDto, token };
  }
}
