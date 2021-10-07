import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { IUserDto } from './../user.interfaces';

export class GetUserDto implements IUserDto {
  @ApiProperty()
  @IsNotEmpty()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
