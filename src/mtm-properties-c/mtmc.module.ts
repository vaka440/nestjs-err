import { Module } from '@nestjs/common';
import { Categoryc } from './Categoryc.entity';
import { Questionc } from './Questionc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MtmcController } from './mtmc.controller';
import { PostToCategory } from './post-to-category.entity';
import { Postc } from './postc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoryc, Questionc, Postc, PostToCategory]),
  ],
  controllers: [MtmcController],
  providers: [],
  exports: [],
})
export class MtmcModule {}
