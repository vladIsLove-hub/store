import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import { Basket } from './baskets.model';

@Module({
  providers: [BasketsService],
  controllers: [BasketsController],
  imports: [TypeOrmModule.forFeature([Basket])],
})
export class BasketsModule {}
