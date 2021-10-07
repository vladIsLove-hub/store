import { IAuthorDto } from 'src/authors/author.interfaces';
import { Author } from 'src/authors/author.model';
import { Category } from 'src/categories/category.model';
import { ICategoryDto } from 'src/categories/category.interfaces';
import { IPublisherDto } from 'src/publishers/publisher.interfaces';
import { Publisher } from 'src/publishers/publisher.model';

export interface IBookDto {
  id?: string;
  title: string;
  category: ICategoryDto | string;
  publisher: IPublisherDto | string;
  authors: IAuthorDto[] | string[];
  price: number;
  discount: number;
  ageLimit: number;
  publicationYear: number;
  numberOfPages: number;
  format: number[];
  vendor: string;
  rating: number;
  image?: string;
}
export interface IBookRelations {
  category: Category;
  publisher: Publisher;
  authors: Author[];
}

export type BookDataForFilterByPriceDifference = {
  priceTo: string;
  priceFrom: string;
};

export type SerializedSortAndFilterData = {
  sortOptions: string;
  priceTo: string;
  priceFrom: string;
};
