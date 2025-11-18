import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTable1763451762551 implements MigrationInterface {
  name = 'AlterUserTable1763451762551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role_id\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role_id\``);
  }
}
