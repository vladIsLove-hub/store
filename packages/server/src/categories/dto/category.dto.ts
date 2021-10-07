import { ApiProperty } from '@nestjs/swagger';

import { ICategoryDto } from '../category.interfaces';

export class CreateCategoryDto implements ICategoryDto {
  @ApiProperty()
  name: string;
}

export class GetCategoryDto implements ICategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class UpdateCategoryDto implements ICategoryDto {
  @ApiProperty()
  name: string;
}
