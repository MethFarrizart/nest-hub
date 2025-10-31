import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    // const user = this.c.create(dto);
    const { username, password } = dto;

    const salt = await bcrypt.genSalt(10);
    const hashPW = await bcrypt.hash(password, salt);

    const existUser = await this.userRepo.findOne({ where: { username } });

    if (existUser) {
      return null;
    }

    const userData = this.userRepo.create({
      username,
      password: hashPW,
    });

    const savedUser = await this.userRepo.save(userData);

    const token = jwt.sign(
      { id: savedUser.id, username: savedUser.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    return { user: savedUser, token };
  }
}
