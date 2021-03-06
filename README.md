# NestJS REST API boilerplate

## Description

NestJS REST API boilerplate for typical project

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding ([typeorm-seeding](https://www.npmjs.com/package/typeorm-seeding)).
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] Nest CRUD ([@nestjsx/crud](https://www.npmjs.com/package/@nestjsx/crud)).
- [x] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Quick run

```bash
cp env-example .env

docker-compose up -d
```

For check status run

```bash
docker-compose logs
```

## Links

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080

## Comfortable development

```bash
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker-compose up -d postgres adminer maildev redis
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Database utils

Generate migration

```bash
npm run migration:generate -- CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Test in Docker

```bash
docker-compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker-compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```

# package

## @nestjsx/crud et @nestjsx/crud-typeorm

- @nestjsx/crud
  - paquet de base qui fournit le d??corateur @Crud() pour la g??n??ration de points de terminaison, la configuration globale, la validation, les d??corateurs d'aide (docs).
- @nestjsx/crud-typeorm
  - Paquet TypeORM qui fournit la base TypeOrmCrudService avec des m??thodes pour les op??rations de base de donn??es CRUD (docs)

g??n??ration de points de terminaison

```ts
import { Crud, CrudController, Override } from '@nestjsx/crud';
...
UsersController implements CrudController<User>
```

la validation

```ts
import { CrudValidationGroups } from '@nestjsx/crud';
...
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
```

des m??thodes pour les op??rations de base de donn??es CRUD

```ts
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
...
export class UsersService extends TypeOrmCrudService<User> {
```

## @nestjs/typeorm

- BaseEntity
- @entity
  - `@Column, @CreateDateColumn, @Entity, @Index, @ManyToOne, @PrimaryGeneratedColumn, @DeleteDateColumn...`
  - `@AfterLoad(), @AfterInsert(), BeforeInsert, BeforeUpdate...`
- @InjectRepository

```ts
  constructor(
    @InjectRepository(Forgot)
        private forgotRepository: Repository<Forgot>,
  ) {}
```

## @nestjs/jwt

## @nestjs/passport

### controllers

- `@UseGuards(AuthGuard('jwt'), RolesGuard)`

### AnonymousStrategy

```ts
@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  public validate(payload: unknown, request: unknown): unknown {
    return request;
  }
```

- super()
  - Dans notre cas d'utilisation avec passport-local, il n'y a pas d'options de configuration, donc notre constructeur appelle simplement super(), sans objet options.
  - la strat??gie passport-local attend par d??faut des propri??t??s appel??es username et password dans le corps de la requ??te.
  - Passez un objet options pour sp??cifier des noms de propri??t??s diff??rents, par exemple : super({ usernameField : 'email' }).
- validate()
  - Pour chaque strat??gie, Passport appellera la fonction verify (impl??ment??e avec la m??thode validate() dans @nestjs/passport)
  - La m??thode validate() pour n'importe quelle strat??gie de passeport suivra un mod??le similaire, ne variant que dans les d??tails de la repr??sentation des informations d'identification.
  - Si un utilisateur est trouv?? et que les informations d'identification sont valides, l'utilisateur est renvoy?? afin que Passport puisse terminer ses t??ches (par exemple, la cr??ation de la propri??t?? utilisateur sur l'objet Request), et que le pipeline de traitement des demandes puisse continuer.
  - S'il n'est pas trouv??, nous lan??ons une exception et laissons notre couche d'exceptions s'en occuper.
  - dans la m??thode validate() pour chaque strat??gie est la fa??on dont vous d??terminez si un utilisateur existe et est valide.
  - Par exemple, dans une strat??gie JWT, en fonction des besoins, nous pouvons ??valuer si l'userId transport?? dans le jeton d??cod?? correspond ?? un enregistrement dans notre base de donn??es d'utilisateurs, ou ?? une liste de jetons r??voqu??s.

### JwtStrategy

```ts
type JwtPayload = Pick<User, 'id' | 'role'> & { iat: number; exp: number };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  public validate(payload: JwtPayload) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
```

`@UseGuards(AuthGuard('jwt'))` <----------> `JwtStrategy`

- validate()
  - Passport va construire un objet utilisateur bas?? sur la valeur de retour de notre m??thode validate(), et l'attacher comme une propri??t?? de l'objet Request.
  - Par exemple, nous pourrions effectuer une consultation de la base de donn??es dans notre m??thode validate() pour extraire plus d'informations sur l'utilisateur,
  - nous pouvons d??cider d'effectuer une validation suppl??mentaire du jeton, par exemple en recherchant l'userId dans une liste de jetons r??voqu??s, ce qui nous permet de proc??der ?? la r??vocation du jeton.

## class-transformer

- Class-transformer vous permet de transformer un objet ordinaire en une instance de classe et vice-versa.
- Il permet ??galement de s??rialiser/d??s??rialiser un objet en fonction de crit??res.
- Cet outil est tr??s utile ?? la fois sur le front-end et le back-end.

### plainToClass

```ts
import { plainToClass } from 'class-transformer';
...
export class AuthService {
...
  const role = plainToClass(Role, {
    id: RoleEnum.user,
  });
...
```

- transforme `{ id: RoleEnum.user, }` en objet avec instance de : `Role`

### Exclude

- ignorer certaines propri??t??s pendant une op??ration. (par d??faut -> la transformation)

```ts
import { Exclude, Transform } from 'class-transformer';
...
@Entity()
export class User extends EntityHelper {
  ...
  @Exclude({ toPlainOnly: true })   // toPlainOnly -> nom de l'op??ration
  @Column({ nullable: true })
  @Index()
  hash: string | null;
  ...
```

- Maintenant, la propri??t?? `hash` sera exclue uniquement pendant l'op??ration `classToPlain`
- avec : `@Exclude()`
  - lorsque vous transformez un `user`, la propri??t?? `hash` sera ignor??e et ne sera pas incluse dans le r??sultat transform??.

### @Transform

```ts
  ...
  @Transform((value: string | null) => value?.toLowerCase().trim())
```

## class-validator

- Permet l'utilisation d'une validation bas??e sur un d??corateur ou non.
- Utilise en interne validator.js pour effectuer la validation.
- Class-validator fonctionne ?? la fois sur le navigateur et sur les plateformes node.js.

```ts
  @IsNotEmpty()
  @IsEmail()
  @IsEmail()
  @IsNotEmpty()
  @MinLength()
  @Validate()
  @Allow()
```

```ts
  ValidatorConstraint,
  ValidatorConstraintInterface,
```

## pg

- Client PostgreSQL non bloquant pour Node.js.
- Purement JavaScript et liaisons natives libpq facultatives.

## rimraf

- The UNIX command rm -rf for node.

## typeorm-seeding

- cr??er des ??chantillons de donn??es pour votre base de donn??es

```
* executer donn??es
npm run seed:run

* cr??er le SQL
npm run migration:generate -- Table

* executer en base
npm run migration:run

* nestjs-boilerplate
npm run build
sh startup.dev.sh


* adminer
serveur: postgres
user: root
pwd: root
```

## typeOrm

### createQueryBuilder

```ts
const countCategory = await connection
  .createQueryBuilder()
  .select()
  .from(Categorya, 'UsCategoryaer')
  .getCount();
```

```ts
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
```

## soft delete (suppression logiciel)

- La colonne importante est la colonne deletedAt dans l'exemple ci-dessus.
- Sans cette colonne, les suppressions logicielles ne fonctionneront pas.
- Si vous ajoutez cette colonne, toutes les lectures du r??f??rentiel typeorm ajouteront une clause where v??rifiant que la colonne est NULL.

```ts
...
@Entity()
export class Questiona extends EntityHelper {
  ...
  @DeleteDateColumn()
  deletedAt?: Date;   // NULL, si supprim?? il y a une date
```

```ts
  ...
  const questiona: Questiona = await this.questionaRepository.findOne(
    params.id,
  );
  return this.questionaRepository.softRemove(questiona);
```
