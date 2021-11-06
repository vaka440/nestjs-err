import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Categorya } from 'src/mtm-simple-a/categorya.entity';
import { Questiona } from 'src/mtm-simple-a/questiona.entity';

export default class CreateMtma implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countCategory = await connection
      .createQueryBuilder()
      .select()
      .from(Categorya, 'UsCategoryaer')
      .getCount();

    if (countCategory === 0) {
      const category1 = new Categorya();
      category1.name = 'animals';
      await connection.manager.save(category1);

      const category2 = new Categorya();
      category2.name = 'zoo';
      await connection.manager.save(category2);

      const question = new Questiona();
      question.title = 'dogs';
      question.text = 'who let the dogs out?';
      question.categories = [category1, category2];
      await connection.manager.save(question);
    }
  }
}
