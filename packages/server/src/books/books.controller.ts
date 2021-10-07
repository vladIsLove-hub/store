import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ErrorsInterceptor } from './errors.interceptor';
import { BooksService } from './books.service';
import { UpdateBookDto, CreateBookDto, GetBookDto, PaginatedBooksResultDto } from './dto';

@ApiTags('Books')
@Controller('api/books')
@UseInterceptors(ErrorsInterceptor)
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'category', required: false, description: 'Get books by category' })
  @ApiQuery({ name: 'limit', required: true })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'sortData', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, type: [GetBookDto] })
  @Get()
  async getAll(
    @Query('category') category: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('sortData') sortData: string,
    @Query('search') search: string,
  ): Promise<PaginatedBooksResultDto> {
    return await this.bookService.findAll({ page, limit }, sortData, category, search);
  }

  @ApiOperation({ summary: 'Get book by ID' })
  @ApiResponse({ status: 200, type: GetBookDto })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<GetBookDto> {
    const book = await this.bookService.findOne(id);
    if (book === null) {
      throw new NotFoundException(`Book with id: ${id} doesn't exist`);
    }
    return book;
  }

  @ApiOperation({ summary: 'Create new book' })
  @ApiResponse({ status: 201, type: GetBookDto })
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createDto: CreateBookDto): Promise<GetBookDto> {
    return await this.bookService.create(createDto);
  }

  @ApiOperation({ summary: 'Update book' })
  @ApiResponse({ status: 200, type: GetBookDto })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateDto: UpdateBookDto): Promise<GetBookDto> {
    return await this.bookService.update(id, updateDto);
  }

  @ApiOperation({ summary: 'Delete book' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const book = await this.bookService.findOne(id);
    if (book === null) {
      throw new NotFoundException(`Book with id: ${id} doesn't exist`);
    }
    await this.bookService.delete(id);
  }
}
