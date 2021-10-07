import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import AuthorMapper from './author.mapper';
import { Author } from './author.model';
import { CreateAuthorDto, GetAuthorDto, UpdateAuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) {}

  async findAll(): Promise<GetAuthorDto[]> {
    const authors: Author[] = await this.authorRepository.find();
    return authors.map(author => AuthorMapper.toDto(author));
  }

  async findOne(id: string): Promise<GetAuthorDto | null> {
    const author = await this.authorRepository.findOne(id);
    if (!author) {
      return null;
    }
    return AuthorMapper.toDto(author);
  }

  async findByIds(ids: string[]): Promise<GetAuthorDto[]> {
    const authors = await this.authorRepository.findByIds(ids);
    return authors.map(author => AuthorMapper.toDto(author));
  }

  async create(authorDto: CreateAuthorDto): Promise<Author> {
    const author: Author = AuthorMapper.toModel<CreateAuthorDto>(authorDto);
    return await this.authorRepository.save(author);
  }

  async update(id: string, updateDto: UpdateAuthorDto): Promise<Author> {
    const modelForUpdate = AuthorMapper.toModel<UpdateAuthorDto>(updateDto);
    modelForUpdate.id = id;
    return await this.authorRepository.save(modelForUpdate);
  }
}
