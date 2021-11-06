import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoryc } from './Categoryc.entity';
import { Questionc } from './Questionc.entity';

@ApiTags('Mtmb')
@Controller({
  path: 'mtmb',
  version: '1',
})
export class MtmcController {
  constructor(
    @InjectRepository(Categoryc)
    private CategorycRepository: Repository<Categoryc>,
    @InjectRepository(Questionc)
    private QuestioncRepository: Repository<Questionc>,
  ) {}
}
