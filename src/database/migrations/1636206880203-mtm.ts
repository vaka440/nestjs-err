import {MigrationInterface, QueryRunner} from "typeorm";

export class mtm1636206880203 implements MigrationInterface {
    name = 'mtm1636206880203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questionb" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_abd78397e74dc5776028972c104" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoryb" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c2ac3a11bde8ac43b9196f13da1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorya" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_81a58df731557c79fe5f2c7be12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questiona" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_9605d28d1fbe589dd71a82b1ba6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questionb_categories_categoryb" ("questionbId" integer NOT NULL, "categorybId" integer NOT NULL, CONSTRAINT "PK_c503770317d8b23ae0a9954f875" PRIMARY KEY ("questionbId", "categorybId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1e882fbee997897283f2e41697" ON "questionb_categories_categoryb" ("questionbId") `);
        await queryRunner.query(`CREATE INDEX "IDX_49cea2c85f166c98c017c72553" ON "questionb_categories_categoryb" ("categorybId") `);
        await queryRunner.query(`CREATE TABLE "questiona_categories_categorya" ("questionaId" integer NOT NULL, "categoryaId" integer NOT NULL, CONSTRAINT "PK_998024f6ef8e74d16fdfeaed697" PRIMARY KEY ("questionaId", "categoryaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b6702aacab25def6b70069a269" ON "questiona_categories_categorya" ("questionaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82ba08f304809eeff810962188" ON "questiona_categories_categorya" ("categoryaId") `);
        await queryRunner.query(`CREATE TABLE "question_categories_category" ("questionId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_11044aadb95ef30daf7d1363d31" PRIMARY KEY ("questionId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21433e6d9a0e7e79c36b4ae69f" ON "question_categories_category" ("questionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9cf04f10454634f887ade56562" ON "question_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "questionb_categories_categoryb" ADD CONSTRAINT "FK_1e882fbee997897283f2e416979" FOREIGN KEY ("questionbId") REFERENCES "questionb"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "questionb_categories_categoryb" ADD CONSTRAINT "FK_49cea2c85f166c98c017c725531" FOREIGN KEY ("categorybId") REFERENCES "categoryb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questiona_categories_categorya" ADD CONSTRAINT "FK_b6702aacab25def6b70069a269c" FOREIGN KEY ("questionaId") REFERENCES "questiona"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "questiona_categories_categorya" ADD CONSTRAINT "FK_82ba08f304809eeff8109621880" FOREIGN KEY ("categoryaId") REFERENCES "categorya"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" ADD CONSTRAINT "FK_21433e6d9a0e7e79c36b4ae69fd" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" ADD CONSTRAINT "FK_9cf04f10454634f887ade565622" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_categories_category" DROP CONSTRAINT "FK_9cf04f10454634f887ade565622"`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" DROP CONSTRAINT "FK_21433e6d9a0e7e79c36b4ae69fd"`);
        await queryRunner.query(`ALTER TABLE "questiona_categories_categorya" DROP CONSTRAINT "FK_82ba08f304809eeff8109621880"`);
        await queryRunner.query(`ALTER TABLE "questiona_categories_categorya" DROP CONSTRAINT "FK_b6702aacab25def6b70069a269c"`);
        await queryRunner.query(`ALTER TABLE "questionb_categories_categoryb" DROP CONSTRAINT "FK_49cea2c85f166c98c017c725531"`);
        await queryRunner.query(`ALTER TABLE "questionb_categories_categoryb" DROP CONSTRAINT "FK_1e882fbee997897283f2e416979"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9cf04f10454634f887ade56562"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21433e6d9a0e7e79c36b4ae69f"`);
        await queryRunner.query(`DROP TABLE "question_categories_category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82ba08f304809eeff810962188"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b6702aacab25def6b70069a269"`);
        await queryRunner.query(`DROP TABLE "questiona_categories_categorya"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49cea2c85f166c98c017c72553"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e882fbee997897283f2e41697"`);
        await queryRunner.query(`DROP TABLE "questionb_categories_categoryb"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "questiona"`);
        await queryRunner.query(`DROP TABLE "categorya"`);
        await queryRunner.query(`DROP TABLE "categoryb"`);
        await queryRunner.query(`DROP TABLE "questionb"`);
    }

}
