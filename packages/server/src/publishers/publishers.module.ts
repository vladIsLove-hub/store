import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { Publisher } from './publisher.model';

@Module({
  providers: [PublishersService],
  controllers: [PublishersController],
  imports: [TypeOrmModule.forFeature([Publisher])],
})
export class PublishersModule {}
