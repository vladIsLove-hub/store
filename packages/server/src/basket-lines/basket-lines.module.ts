import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketLinesService } from './basket-lines.service';
import { BasketLinesController } from './basket-lines.controller';
import { BasketLine } from './basket-lines.model';

@Module({
  providers: [BasketLinesService],
  controllers: [BasketLinesController],
  imports: [TypeOrmModule.forFeature([BasketLine])],
})
export class BasketLinesModule {}
