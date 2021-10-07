import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { BasketLinesModule } from './basket-lines/basket-lines.module';
import { BasketsModule } from './baskets/baskets.module';
import { PublishersModule } from './publishers/publishers.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import config from './typeorm.config';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env' }),
    TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    BooksModule,
    CategoriesModule,
    AuthorsModule,
    BasketLinesModule,
    BasketsModule,
    PublishersModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
