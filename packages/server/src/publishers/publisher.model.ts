import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Book } from 'src/books/book.model';

@Entity()
@Unique(['name'])
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { nullable: false, length: 40 })
  name: string;

  @OneToMany(() => Book, book => book.publisher)
  book: Book[];
}
