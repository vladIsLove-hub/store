import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Category } from './category.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [GetCategoryDto] })
  @Get()
  async getAll(): Promise<GetCategoryDto[]> {
    return await this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, type: GetCategoryDto })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<GetCategoryDto> {
    const category = await this.categoryService.findOne(id);
    if (category === null) {
      throw new NotFoundException(`Category with id: ${id} doesn't exist`);
    }
    return category;
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 201, type: GetCategoryDto })
  @Post()
  async create(@Body() createDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryService.create(createDto);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: GetCategoryDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto): Promise<Category | null> {
    const category = await this.categoryService.findOne(id);
    if (category === null) {
      throw new NotFoundException(`Category with id: ${id} doesn't exist`);
    }
    try {
      return await this.categoryService.update(id, updateDto);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const category = await this.categoryService.findOne(id);
    if (category === null) {
      throw new NotFoundException(`Category with id: ${id} doesn't exist`);
    }
    try {
      await this.categoryService.delete(id);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }
}
