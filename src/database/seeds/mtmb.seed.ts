import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Categoryb } from 'src/mtm-bi-directional-b/categoryb.entity';
import { Questionb } from 'src/mtm-bi-directional-b/questionb.entity';

export default class CreateMtmb implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countCategory = await connection
      .createQueryBuilder()
      .select()
      .from(Categoryb, 'UsCategoryber')
      .getCount();

    if (countCategory === 0) {
      const category1 = new Categoryb();
      category1.name = 'animals';
      await connection.manager.save(category1);

      const category2 = new Categoryb();
      category2.name = 'zoo';
      await connection.manager.save(category2);

      const question = new Questionb();
      question.title = 'dogs';
      question.text = 'who let the dogs out?';
      question.categories = [category1, category2];
      await connection.manager.save(question);
    }
  }
}
