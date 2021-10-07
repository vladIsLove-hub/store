import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.model';
import CategoryMapper from './category.mapper';
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async findAll(): Promise<GetCategoryDto[]> {
    const categories: Category[] = await this.categoryRepository.find();
    return categories.map(category => CategoryMapper.toDto(category));
  }

  async findOne(id: string): Promise<GetCategoryDto | null> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      return null;
    }
    return CategoryMapper.toDto(category);
  }

  async create(categoryDto: CreateCategoryDto): Promise<Category> {
    const category: Category = CategoryMapper.toModel<CreateCategoryDto>(categoryDto);
    return await this.categoryRepository.save(category);
  }

  async update(id: string, updateDto: UpdateCategoryDto): Promise<Category | null> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      return null;
    }
    const modelForUpdate = CategoryMapper.toModel<UpdateCategoryDto>(updateDto);
    category.name = modelForUpdate.name;
    return await this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<void | null> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      return null;
    }
    await this.categoryRepository.delete(id);
  }
}
