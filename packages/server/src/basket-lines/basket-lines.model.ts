import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Basket } from 'src/baskets/baskets.model';
import { Book } from 'src/books/book.model';

@Entity()
export class BasketLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Book)
  @JoinColumn()
  book: Book;

  @OneToOne(() => Basket)
  @JoinColumn()
  basket: Basket;

  @Column({ nullable: false })
  quantity: number;

  @Column('double precision', { nullable: false })
  total: number;

  @Column('double precision', { nullable: false })
  defaultPrice: number;

  @Column('double precision', { nullable: false })
  discount: number;
}
