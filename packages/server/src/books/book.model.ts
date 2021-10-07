import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Author } from 'src/authors/author.model';
import { Category } from 'src/categories/category.model';
import { Publisher } from 'src/publishers/publisher.model';

@Unique(['title', 'numberOfPages'])
@Unique(['title', 'format'])
@Unique(['title', 'vendor'])
@Unique(['title', 'image'])
@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { nullable: false, length: 80 })
  title: string;

  @ManyToOne(() => Category, category => category.book)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Publisher, publisher => publisher.book)
  @JoinColumn()
  publisher: Publisher;

  @ManyToMany(() => Author)
  @JoinTable({ name: 'author-book' })
  authors: Author[];

  @Column('double precision', { nullable: false })
  price: number;

  @Column('double precision', { nullable: false })
  discount: number;

  @Column({ nullable: false })
  ageLimit: number;

  @Column({ nullable: false })
  publicationYear: number;

  @Column({ nullable: false })
  numberOfPages: number;

  @Column('integer', { array: true, nullable: false })
  format: number[];

  @Column('character varying', { nullable: false, length: 15 })
  vendor: string;

  @Column('double precision', { nullable: false })
  rating: number;

  @Column('character varying', { nullable: true })
  image: string;
}
