import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUnitTable1759825153158 implements MigrationInterface {
  name = 'CreateUnitTable1759825153158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "units" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "units"`);
  }
}
