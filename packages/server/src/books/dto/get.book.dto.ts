import { ApiProperty } from '@nestjs/swagger';

import { IBookDto } from '../book.interfaces';

import { GetAuthorDto } from 'src/authors/dto/author.dto';
import { GetCategoryDto } from 'src/categories/dto/category.dto';
import { GetPublisherDto } from 'src/publishers/dto/publisher.dto';

class GetBookDto implements IBookDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: GetCategoryDto;

  @ApiProperty()
  publisher: GetPublisherDto;

  @ApiProperty()
  authors: GetAuthorDto[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  ageLimit: number;

  @ApiProperty()
  publicationYear: number;

  @ApiProperty()
  numberOfPages: number;

  @ApiProperty()
  format: number[];

  @ApiProperty()
  vendor: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  image?: string;
}

export default GetBookDto;
