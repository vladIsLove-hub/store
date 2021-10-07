import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv = require('dotenv');

import { Author } from './authors/author.model';
import { BasketLine } from './basket-lines/basket-lines.model';
import { Basket } from './baskets/baskets.model';
import { Book } from './books/book.model';
import { Category } from './categories/category.model';
import { Publisher } from './publishers/publisher.model';
import { User } from './user/user.model';

dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [Book, Author, BasketLine, Basket, Category, Publisher, User],
  synchronize: false,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
