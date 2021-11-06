import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { plainToClass } from 'class-transformer';
import { Address } from 'src/users/address.entity';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countUser = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .where('"User"."roleId" = :roleId', { roleId: RoleEnum.user })
      .getCount();

    const address = getRepository(Address).create({
      street: 'street1',
      city: 'city1',
      country: 'country1',
    });

    await getRepository(Address).save(address);

    if (countUser === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          plainToClass(User, {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'secret',
            role: {
              id: RoleEnum.user,
              name: 'Admin',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
            address,
          }),
        ])
        .execute();
    }
  }
}
