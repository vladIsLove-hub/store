import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, Max, Min } from 'class-validator';

import { IBookDto } from '../book.interfaces';

class CreateBookDto implements IBookDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  authors: string[];

  @ApiProperty()
  @Min(1, { message: 'Price not must be less than 1$' })
  @Max(1000, { message: 'Price not must be more than 1000$' })
  price: number;

  @ApiProperty()
  @Min(0, { message: 'Discount must be a positive value' })
  @Max(0.99, { message: 'Discount must be less than 1' })
  discount: number;

  @ApiProperty()
  @IsInt({ message: 'Age limit must be an integer value' })
  @Min(0, { message: 'Age limit must be a positive integer value' })
  @Max(21, { message: 'Age limit not must be more than 21' })
  ageLimit: number;

  @ApiProperty()
  @IsInt({ message: 'Publication year must be an integer value' })
  @Min(1700, { message: 'Publication year not must be less than 1700' })
  @Max(new Date().getFullYear(), { message: 'Publication year not must be more than current year' })
  publicationYear: number;

  @ApiProperty()
  @IsInt({ message: 'Number of pages must be an integer value' })
  @Min(1, { message: 'Number of pages not must be less than 1' })
  @Max(5000, { message: 'Number of pages must be less 5001' })
  numberOfPages: number;

  @ApiProperty()
  @IsArray()
  @ArrayMaxSize(2, { message: 'Both fields must be specified' })
  @ArrayMinSize(2, { message: 'Both fields must be specified' })
  format: number[];

  @ApiProperty()
  vendor: string;

  @ApiProperty()
  @Min(0, { message: 'Rating must be a positive value' })
  @Max(5, { message: 'Rating must be less than 5' })
  rating: number;

  @ApiProperty()
  image?: string;
}

export default CreateBookDto;
