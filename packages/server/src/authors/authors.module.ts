import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorsController } from './authors.controller';
import { Author } from './author.model';
import { AuthorsService } from './authors.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [TypeOrmModule.forFeature([Author])],
})
export class AuthorsModule {}
