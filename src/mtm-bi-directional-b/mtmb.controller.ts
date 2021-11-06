import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoryb } from './Categoryb.entity';
import { Questionb } from './Questionb.entity';

@ApiTags('Mtmb')
@Controller({
  path: 'mtmb',
  version: '1',
})
export class MtmbController {
  constructor(
    @InjectRepository(Categoryb)
    private CategorybRepository: Repository<Categoryb>,
    @InjectRepository(Questionb)
    private QuestionbRepository: Repository<Questionb>,
  ) {}

  // Question

  @Get('cqb1')
  async cqb1() {
    return this.QuestionbRepository.find({
      relations: ['categories'],
    });
  }

  @Get('cqb2')
  cqb2() {
    return this.QuestionbRepository.createQueryBuilder('Questionb')
      .leftJoinAndSelect('Questionb.categories', 'Categoryb')
      .getMany();
  }

  // Category

  @Get('ccb1')
  async ccb1() {
    return this.CategorybRepository.find({
      relations: ['questions'],
    });
  }

  @Get('ccb2')
  ccb2() {
    return this.CategorybRepository.createQueryBuilder('Categoryb')
      .leftJoinAndSelect('Categoryb.questions', 'Questionb')
      .getMany();
  }
}
