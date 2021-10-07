import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Book } from 'src/books/book.model';

@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { nullable: false, length: 20 })
  name: string;

  @OneToMany(() => Book, book => book.category)
  book: Book[];
}
