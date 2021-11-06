import { Module } from '@nestjs/common';
import { Categoryb } from './categoryb.entity';
import { Questionb } from './questionb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MtmbController } from './mtmb.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoryb, Questionb])],
  controllers: [MtmbController],
  providers: [],
  exports: [],
})
export class MtmbModule {}
