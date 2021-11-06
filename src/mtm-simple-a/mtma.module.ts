import { Module } from '@nestjs/common';
import { Categorya } from './categorya.entity';
import { Questiona } from './questiona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MtmaController } from './mtma.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categorya, Questiona])],
  controllers: [MtmaController],
  providers: [],
  exports: [],
})
export class MtmaModule {}
