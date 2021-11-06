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
  - paquet de base qui fournit le décorateur @Crud() pour la génération de points de terminaison, la configuration globale, la validation, les décorateurs d'aide (docs).
- @nestjsx/crud-typeorm
  - Paquet TypeORM qui fournit la base TypeOrmCrudService avec des méthodes pour les opérations de base de données CRUD (docs)

génération de points de terminaison

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

des méthodes pour les opérations de base de données CRUD

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
  - la stratégie passport-local attend par défaut des propriétés appelées username et password dans le corps de la requête.
  - Passez un objet options pour spécifier des noms de propriétés différents, par exemple : super({ usernameField : 'email' }).
- validate()
  - Pour chaque stratégie, Passport appellera la fonction verify (implémentée avec la méthode validate() dans @nestjs/passport)
  - La méthode validate() pour n'importe quelle stratégie de passeport suivra un modèle similaire, ne variant que dans les détails de la représentation des informations d'identification.
  - Si un utilisateur est trouvé et que les informations d'identification sont valides, l'utilisateur est renvoyé afin que Passport puisse terminer ses tâches (par exemple, la création de la propriété utilisateur sur l'objet Request), et que le pipeline de traitement des demandes puisse continuer.
  - S'il n'est pas trouvé, nous lançons une exception et laissons notre couche d'exceptions s'en occuper.
  - dans la méthode validate() pour chaque stratégie est la façon dont vous déterminez si un utilisateur existe et est valide.
  - Par exemple, dans une stratégie JWT, en fonction des besoins, nous pouvons évaluer si l'userId transporté dans le jeton décodé correspond à un enregistrement dans notre base de données d'utilisateurs, ou à une liste de jetons révoqués.

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
  - Passport va construire un objet utilisateur basé sur la valeur de retour de notre méthode validate(), et l'attacher comme une propriété de l'objet Request.
  - Par exemple, nous pourrions effectuer une consultation de la base de données dans notre méthode validate() pour extraire plus d'informations sur l'utilisateur,
  - nous pouvons décider d'effectuer une validation supplémentaire du jeton, par exemple en recherchant l'userId dans une liste de jetons révoqués, ce qui nous permet de procéder à la révocation du jeton.

## class-transformer

- Class-transformer vous permet de transformer un objet ordinaire en une instance de classe et vice-versa.
- Il permet également de sérialiser/désérialiser un objet en fonction de critères.
- Cet outil est très utile à la fois sur le front-end et le back-end.

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

- ignorer certaines propriétés pendant une opération. (par défaut -> la transformation)

```ts
import { Exclude, Transform } from 'class-transformer';
...
@Entity()
export class User extends EntityHelper {
  ...
  @Exclude({ toPlainOnly: true })   // toPlainOnly -> nom de l'opération
  @Column({ nullable: true })
  @Index()
  hash: string | null;
  ...
```

- Maintenant, la propriété `hash` sera exclue uniquement pendant l'opération `classToPlain`
- avec : `@Exclude()`
  - lorsque vous transformez un `user`, la propriété `hash` sera ignorée et ne sera pas incluse dans le résultat transformé.

### @Transform

```ts
  ...
  @Transform((value: string | null) => value?.toLowerCase().trim())
```

## class-validator

- Permet l'utilisation d'une validation basée sur un décorateur ou non.
- Utilise en interne validator.js pour effectuer la validation.
- Class-validator fonctionne à la fois sur le navigateur et sur les plateformes node.js.

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

- créer des échantillons de données pour votre base de données

```
* executer données
npm run seed:run

* créer le SQL
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
- Si vous ajoutez cette colonne, toutes les lectures du référentiel typeorm ajouteront une clause where vérifiant que la colonne est NULL.

```ts
...
@Entity()
export class Questiona extends EntityHelper {
  ...
  @DeleteDateColumn()
  deletedAt?: Date;   // NULL, si supprimé il y a une date
```

```ts
  ...
  const questiona: Questiona = await this.questionaRepository.findOne(
    params.id,
  );
  return this.questionaRepository.softRemove(questiona);
```
