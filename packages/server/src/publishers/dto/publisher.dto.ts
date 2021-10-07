import { ApiProperty } from '@nestjs/swagger';

import { IPublisherDto } from '../publisher.interfaces';

export class CreatePublisherDto implements IPublisherDto {
  @ApiProperty()
  name: string;
}

export class GetPublisherDto implements IPublisherDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class UpdatePublisherDto implements IPublisherDto {
  @ApiProperty()
  name: string;
}
