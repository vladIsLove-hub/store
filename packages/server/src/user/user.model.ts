import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

const bcrypt = require('bcrypt');

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { nullable: true, unique: true })
  username: string;

  @Column('character varying', { nullable: true, unique: true })
  email: string;

  @Column('character varying', { nullable: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
