import {MigrationInterface, QueryRunner} from "typeorm";

export class mto1636206977643 implements MigrationInterface {
    name = 'mto1636206977643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userd" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_70e0cfd6769418655de0ceaf176" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "userd_id" integer NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "post_id" integer NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_3f1ec29180004c39992ab4236e0" FOREIGN KEY ("userd_id") REFERENCES "userd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_595c60d3e7e8edf1cc0912782bd" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_595c60d3e7e8edf1cc0912782bd"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_3f1ec29180004c39992ab4236e0"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "userd"`);
    }

}
