import { ApiProperty } from '@nestjs/swagger';

import { IAuthorDto } from '../author.interfaces';

export class CreateAuthorDto implements IAuthorDto {
  @ApiProperty()
  name: string;
}

export class GetAuthorDto implements IAuthorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class UpdateAuthorDto implements IAuthorDto {
  @ApiProperty()
  name: string;
}
