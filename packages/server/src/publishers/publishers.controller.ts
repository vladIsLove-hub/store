import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  NotFoundException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePublisherDto, GetPublisherDto, UpdatePublisherDto } from './dto/publisher.dto';
import { Publisher } from './publisher.model';
import { PublishersService } from './publishers.service';

@ApiTags('Publishers')
@Controller('api/publishers')
export class PublishersController {
  constructor(private readonly publisherService: PublishersService) {}

  @ApiOperation({ summary: 'Get all publishers' })
  @ApiResponse({ status: 200, type: [GetPublisherDto] })
  @Get()
  async getAll(): Promise<GetPublisherDto[]> {
    return await this.publisherService.findAll();
  }

  @ApiOperation({ summary: 'Get publisher by ID' })
  @ApiResponse({ status: 200, type: Publisher })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<GetPublisherDto> {
    const publisher = await this.publisherService.findOne(id);
    if (publisher === null) {
      throw new NotFoundException(`Publisher with id: ${id} doesn't exist`);
    }
    return publisher;
  }

  @ApiOperation({ summary: 'Create new publisher' })
  @ApiResponse({ status: 201, type: GetPublisherDto })
  @Post()
  async create(@Body() createDto: CreatePublisherDto): Promise<Publisher> {
    try {
      return await this.publisherService.create(createDto);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }

  @ApiOperation({ summary: 'Update publisher' })
  @ApiResponse({ status: 200, type: GetPublisherDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdatePublisherDto): Promise<Publisher | null> {
    const publisher = await this.publisherService.findOne(id);
    if (publisher === null) {
      throw new NotFoundException(`Publisher with id:  ${id} doesn't exist`);
    }
    try {
      return await this.publisherService.update(id, updateDto);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }

  @ApiOperation({ summary: 'Delete publisher' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const publisher = await this.publisherService.findOne(id);
    if (publisher === null) {
      throw new NotFoundException(`Publisher with id: ${id} doesn't exist`);
    }
    try {
      await this.publisherService.delete(id);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e.message;
      }

      throw e;
    }
  }
}
