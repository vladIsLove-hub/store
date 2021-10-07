import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, GetUserDto } from 'src/user/dto';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
import { UserService } from 'src/user/user.service';

import { CreateTokenReturnedValue, JwtPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly userServivce: UserService, private readonly jwtService: JwtService) {}

  async register(userDto: CreateUserDto): Promise<GetUserDto> {
    const createdUser = await this.userServivce.create(userDto);

    if (!createdUser) {
      throw new BadRequestException('Something went wrong');
    }

    return createdUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<GetUserDto> {
    const user = await this.userServivce.findByLogin(loginUserDto);
    return user;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDto> {
    const user = await this.userServivce.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  public getCookieWithJwtToken(user: GetUserDto) {
    const token = this.createToken(user);
    return `Authentication=${token.accessToken}; HttpOnly; Path=/; Expires=${process.env.EXPIRESIN}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private createToken({ username }: GetUserDto): CreateTokenReturnedValue {
    const user = {
      username,
    };

    const accessToken = this.jwtService.sign(user);
    console.log(process.env.EXPIRESIN);
    return {
      expiresIn: process.env.EXPIRESIN ?? '1800s',
      accessToken,
    };
  }
}
