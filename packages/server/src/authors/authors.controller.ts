import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Author } from './author.model';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto, GetAuthorDto, UpdateAuthorDto } from './dto/author.dto';

@ApiTags('Authors')
@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, type: [GetAuthorDto] })
  @Get()
  async getAll(): Promise<GetAuthorDto[]> {
    return await this.authorService.findAll();
  }

  @ApiOperation({ summary: 'Get author by ID' })
  @ApiResponse({ status: 200, type: GetAuthorDto })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<GetAuthorDto> {
    const author = await this.authorService.findOne(id);
    if (author === null) {
      throw new NotFoundException(`Author with id: ${id} doesn't exist`);
    }
    return author;
  }

  @ApiOperation({ summary: 'Create new author' })
  @ApiResponse({ status: 201, type: GetAuthorDto })
  @Post()
  async create(@Body() createDto: CreateAuthorDto): Promise<GetAuthorDto> {
    try {
      return await this.authorService.create(createDto);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }

  @ApiOperation({ summary: 'Update author' })
  @ApiResponse({ status: 200 })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorService.findOne(id);
    if (author === null) {
      throw new NotFoundException(`Author with id: ${id} doesn't exist`);
    }
    try {
      return await this.authorService.update(id, updateDto);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }
}
