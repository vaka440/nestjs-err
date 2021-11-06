import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Question } from './question.entity';

@ApiTags('Mtm')
@Controller({
  path: 'mtm',
  version: '1',
})
export class MtmController {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
    @InjectRepository(Question)
    private QuestionRepository: Repository<Question>,
  ) {}
}
