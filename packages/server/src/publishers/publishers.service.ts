import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePublisherDto, GetPublisherDto, UpdatePublisherDto } from './dto/publisher.dto';
import PublisherMapper from './publisher.mapper';
import { Publisher } from './publisher.model';

@Injectable()
export class PublishersService {
  constructor(@InjectRepository(Publisher) private publisherRepository: Repository<Publisher>) {}

  async findAll(): Promise<GetPublisherDto[]> {
    const publisher: Publisher[] = await this.publisherRepository.find();
    return publisher.map(category => PublisherMapper.toDto(category));
  }

  async findOne(id: string): Promise<GetPublisherDto | null> {
    const publisher = await this.publisherRepository.findOne(id);
    if (!publisher) {
      return null;
    }
    return PublisherMapper.toDto(publisher);
  }

  async create(publisherDto: CreatePublisherDto): Promise<Publisher> {
    const publisher: Publisher = PublisherMapper.toModel<CreatePublisherDto>(publisherDto);
    return await this.publisherRepository.save(publisher);
  }

  async update(id: string, updateDto: UpdatePublisherDto): Promise<Publisher | null> {
    const publisher = await this.publisherRepository.findOne(id);
    if (!publisher) {
      return null;
    }
    const modelForUpdate = PublisherMapper.toModel<UpdatePublisherDto>(updateDto);
    publisher.name = modelForUpdate.name;
    return await this.publisherRepository.save(publisher);
  }

  async delete(id: string): Promise<void | null> {
    const publisher = await this.publisherRepository.findOne(id);
    if (!publisher) {
      return null;
    }
    await this.publisherRepository.delete(id);
  }
}
