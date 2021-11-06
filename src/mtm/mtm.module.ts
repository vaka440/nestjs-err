import { Module } from '@nestjs/common';
import { Category } from './category.entity';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MtmController } from './mtm.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Question])],
  controllers: [MtmController],
  providers: [],
  exports: [],
})
export class MtmModule {}
