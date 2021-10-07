import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Book } from 'src/books/book.model';

@Entity()
@Unique(['name'])
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { nullable: false, length: 50 })
  name: string;

  @ManyToMany(() => Book)
  @JoinTable({ name: 'author-book' })
  book: Book[];
}
