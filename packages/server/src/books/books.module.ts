import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Author } from 'src/authors/author.model';
import { AuthorsService } from 'src/authors/authors.service';
import { Category } from 'src/categories/category.model';
import { CategoriesService } from 'src/categories/categories.service';
import { Publisher } from 'src/publishers/publisher.model';
import { PublishersService } from 'src/publishers/publishers.service';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

import { BooksController } from './books.controller';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, CategoriesService, PublishersService, AuthorsService],
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([Book, Category, Publisher, Author, User])],
})
export class BooksModule {}
