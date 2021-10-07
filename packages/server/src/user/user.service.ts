import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './user.model';
import { LoginStatus } from './../auth/auth.interfaces';
import { CreateUserDto, GetUserDto } from './dto';
import UserMapper from './user.mapper';
import { LoginUserDto } from './dto/login.user.dto';
import { comparePassword } from './user.utils';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findAll(): Promise<GetUserDto[]> {
    const users: User[] = await this.userRepository.find();
    return users.map(user => UserMapper.toDto(user));
  }

  async findOne(id: string): Promise<GetUserDto | null> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      return null;
    }
    return UserMapper.toDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<GetUserDto> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await comparePassword(user.password, password);

    if (!areEqual) {
      throw new HttpException('Wrong login or password. Try again', HttpStatus.UNAUTHORIZED);
    }

    return UserMapper.toDto(user);
  }

  async findByPayload(username: string): Promise<GetUserDto> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async create(userDto: CreateUserDto): Promise<GetUserDto> {
    const { username } = userDto;

    const userInDb = await this.userRepository.findOne({ where: { username } });
    if (userInDb) {
      throw new BadRequestException('User already exists');
    }

    const user = UserMapper.toModel<CreateUserDto>(userDto);
    return UserMapper.toDto(await this.userRepository.save(user));
  }
}
