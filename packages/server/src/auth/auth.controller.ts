import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto, GetUserDto } from 'src/user/dto';

import { LoginUserDto } from './../user/dto/login.user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authSevice: AuthService) {}

  @ApiOperation({ summary: 'Registeration new user' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    const user = await this.authSevice.register(createUserDto);
    if (!user) {
      throw new BadRequestException('Something went wrong');
    }

    return user;
  }

  @ApiOperation({ summary: 'Login in' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Response<GetUserDto>> {
    const user = await this.authSevice.login(loginUserDto);
    const cookie = this.authSevice.getCookieWithJwtToken(user);
    res.setHeader('Set-Cookie', cookie);
    return res.send(user);
  }

  @ApiOperation({ summary: 'Log out' })
  @Post('logout')
  async logout(@Res() response: Response): Promise<Response> {
    response.setHeader('Set-Cookie', this.authSevice.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
