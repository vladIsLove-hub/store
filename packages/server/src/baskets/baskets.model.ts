import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone', { nullable: false })
  date: Date;

  @Column('double precision', { nullable: false })
  price: number;

  @Column('double precision', { nullable: false })
  totalPrice: number;

  @Column('boolean', { nullable: false })
  isCompleted: boolean;
}
