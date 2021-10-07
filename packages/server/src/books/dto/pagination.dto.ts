import GetBookDto from './get.book.dto';

class PaginationDto {
  page: number;
  limit: number;
}

class PaginatedBooksResultDto {
  books: GetBookDto[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export { PaginatedBooksResultDto, PaginationDto };
