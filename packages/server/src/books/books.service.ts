import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';

import { Author } from 'src/authors/author.model';
import { Category } from 'src/categories/category.model';
import { Publisher } from 'src/publishers/publisher.model';
import serialize from 'src/utils/serialize';

import BookMapper from './book.mapper';
import { Book } from './book.model';
import { IBookRelations, BookDataForFilterByPriceDifference, SerializedSortAndFilterData } from './book.interfaces';
import { UpdateBookDto, CreateBookDto, GetBookDto, PaginationDto, PaginatedBooksResultDto } from './dto';

@Injectable()
export class BooksService {
  private readonly relations: string[] = ['category', 'publisher', 'authors'];

  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Publisher) private publisherRepository: Repository<Publisher>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async findAll(
    pagination: PaginationDto,
    sortAndFilterData: string,
    categoryName?: string,
    search?: string,
  ): Promise<PaginatedBooksResultDto> {
    const { page, limit } = pagination;
    const skippedItems: number = (page - 1) * limit;

    const serializedSortAndFilterData: SerializedSortAndFilterData = serialize(sortAndFilterData);

    const [books, totalCount] = await this.getBooksAndCountForPagination(
      skippedItems,
      limit,
      serializedSortAndFilterData,
      search,
      categoryName,
    );
    const totalPages: number = Math.ceil(totalCount / limit);

    const booksDtos: GetBookDto[] = books.map(book => BookMapper.toDto(book));
    return {
      books: booksDtos,
      limit,
      page,
      totalCount,
      totalPages,
    };
  }

  async findOne(id: string): Promise<GetBookDto | null> {
    const book = await this.bookRepository.findOne(id, { relations: this.relations });
    if (!book) {
      return null;
    }
    return BookMapper.toDto(book);
  }

  async create(bookDto: CreateBookDto): Promise<GetBookDto> {
    const category = await this.getCategoryById(bookDto.category);
    const publisher = await this.getPublisherById(bookDto.publisher);
    const authors = await this.getAuthorsByIds(bookDto.authors);

    const relations: IBookRelations = {
      category,
      publisher,
      authors,
    };

    const book = BookMapper.toModel<CreateBookDto>(bookDto, relations);
    return BookMapper.toDto(await this.bookRepository.save(book));
  }

  async update(id: string, updateDto: UpdateBookDto): Promise<GetBookDto> {
    const ids = updateDto.authors ?? [];
    const book = await this.bookRepository.findOne(id, { relations: this.relations });
    if (!book) {
      throw new NotFoundException(`Book with id: ${id} doesn't exist`);
    }

    const newBook = BookMapper.patchBookDtoToBook(book, updateDto);

    if (updateDto.category) {
      const category = await this.getCategoryById(updateDto.category);
      newBook.category = category;
    }

    if (updateDto.publisher) {
      const publisher = await this.getPublisherById(updateDto.publisher);
      newBook.publisher = publisher;
    }

    if (updateDto.authors?.length) {
      const authors = await this.getAuthorsByIds(ids);
      newBook.authors = authors;
    }

    return BookMapper.toDto(await this.bookRepository.save(newBook));
  }

  async delete(id: string): Promise<void | null> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      return null;
    }
    await this.bookRepository.delete(id);
  }

  private getAuthorsExсeptionMessage(authors: Author[]): string {
    return `${!authors.length ? 'No author found for this request' : 'Authors were found for this request: '}${authors
      .map(author => author.name)
      .join(',')}. Please check the existence of other authors`;
  }

  private async getCategoryById(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id: ${categoryId} doesn't exist`);
    }
    return category;
  }

  private async checkCategoryForExistence(categoryName: string): Promise<boolean> {
    const category = await this.categoryRepository.findOne({ where: { name: categoryName } });
    if (!category) {
      return false;
    }
    return true;
  }

  private async getPublisherById(publisherId: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne(publisherId);
    if (!publisher) {
      throw new NotFoundException(`Publisher with id: ${publisherId} doesn't exist`);
    }
    return publisher;
  }

  private async getAuthorsByIds(authorIds: string[]): Promise<Author[]> {
    const authors = await this.authorRepository.findByIds([...authorIds]);
    if (authors.length !== authorIds.length) {
      throw new NotFoundException(this.getAuthorsExсeptionMessage(authors));
    }
    return authors;
  }

  private getBooksQueryWithRelations(): SelectQueryBuilder<Book> {
    const booksQuery = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category')
      .leftJoinAndSelect('book.publisher', 'publisher')
      .leftJoinAndSelect('book.authors', 'authors');

    return booksQuery;
  }

  private sortBooks(booksQuery: SelectQueryBuilder<Book>, sortOptions: string): void {
    const [field, sortType] = sortOptions.split(',');
    const sortCondition = sortType === 'DESC' ? 'DESC' : 'ASC';
    booksQuery.orderBy(`book.${field}`, sortCondition);
  }

  private async filterBooksByPriceDifference(
    booksQuery: SelectQueryBuilder<Book>,
    filterData: BookDataForFilterByPriceDifference,
  ): Promise<void> {
    const { priceTo, priceFrom } = filterData;
    if (priceFrom) {
      booksQuery.andWhere(
        new Brackets(qb => {
          qb.andWhere('book.price > :priceFrom', { priceFrom });
        }),
      );
    }
    if (priceTo) {
      booksQuery.andWhere(
        new Brackets(qb => {
          qb.andWhere('book.price < :priceTo', { priceTo });
        }),
      );
    }
  }

  private async filterBooksByCategory(booksQuery: SelectQueryBuilder<Book>, categoryName: string): Promise<void> {
    const isCategoryExist = await this.checkCategoryForExistence(categoryName);
    if (!isCategoryExist) {
      throw new NotFoundException(`Category: <${categoryName}> not found`);
    }
    booksQuery.where('LOWER(category.name) = LOWER(:categoryName)', { categoryName }).getManyAndCount();
  }

  private async searchBooks(booksQuery: SelectQueryBuilder<Book>, searchString: string): Promise<void> {
    booksQuery
      .where(
        new Brackets(qb => {
          qb.where(`book.title ~* :searchString`, { searchString }).orWhere(`authors.name ~* :searchString`, {
            searchString,
          });
        }),
      )
      .getMany();
  }

  private async getBooksAndCountForPagination(
    skippedItems: number,
    limit: number,
    serializedSortAndFilterData: SerializedSortAndFilterData,
    search?: string,
    categoryName?: string,
  ): Promise<[Book[], number]> {
    const booksQuery: SelectQueryBuilder<Book> = this.getBooksQueryWithRelations();

    if (categoryName) {
      await this.filterBooksByCategory(booksQuery, categoryName);
    }

    if (search) {
      this.searchBooks(booksQuery, search);
    }

    if (serializedSortAndFilterData) {
      const { priceFrom, priceTo, sortOptions } = serializedSortAndFilterData;

      if (sortOptions) {
        this.sortBooks(booksQuery, sortOptions);
      }

      if (priceFrom || priceTo) {
        const prices: BookDataForFilterByPriceDifference = { priceFrom, priceTo };
        this.filterBooksByPriceDifference(booksQuery, prices);
      }
    }

    booksQuery.skip(skippedItems).take(limit);

    return await booksQuery.getManyAndCount();
  }
}
