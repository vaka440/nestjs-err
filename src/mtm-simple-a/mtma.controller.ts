import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorya } from './categorya.entity';
import { Questiona } from './questiona.entity';

@ApiTags('Mtma')
@Controller({
  path: 'mtma',
  version: '1',
})
export class MtmaController {
  constructor(
    @InjectRepository(Categorya)
    private categoryaRepository: Repository<Categorya>,
    @InjectRepository(Questiona)
    private questionaRepository: Repository<Questiona>,
  ) {}

  @Get('ca')
  ca() {
    return this.categoryaRepository.find();
  }

  @Get('qa')
  qa() {
    return this.questionaRepository.find();
  }

  @Get('cqa1')
  async cqa1() {
    return this.questionaRepository.find({
      relations: ['categories'],
    });
  }

  @Get('cqa2')
  cqa2() {
    return this.questionaRepository
      .createQueryBuilder('questiona')
      .leftJoinAndSelect('questiona.categories', 'categorya')
      .getMany();
    /*
    const questionRepository = connection.getRepository(Question);
    const questions = await questionRepository.find({ relations: ["categories"] });
    */
  }

  // suppression logiciel
  @Get('dqa/:id')
  async dqa(@Param() params) {
    const questiona: Questiona = await this.questionaRepository.findOne(
      params.id,
    );
    return this.questionaRepository.softRemove(questiona);
    /*
    await connection.manager.softRemove(questiona);
    */
  }

  // suppression physique
  @Get('rqa/:id')
  async rqa(@Param() params) {
    const questiona: Questiona = await this.questionaRepository.findOne(
      params.id,
    );
    return this.questionaRepository.remove(questiona);
    /*
    const question = getRepository(Question);
    question.categories = question.categories.filter(category => {
        return category.id !== categoryToRemove.id
    })
    await connection.manager.save(question)
    */
  }
}
