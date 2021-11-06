import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Post } from './post.entity';
import { Userd } from './userd.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userd, Post, Image])],
  controllers: [],
  providers: [],
  exports: [],
})
export class MtoModule {}
