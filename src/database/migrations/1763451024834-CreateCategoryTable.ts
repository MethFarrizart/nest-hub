import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryTable1763451024834 implements MigrationInterface {
  name = 'CreateCategoryTable1763451024834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
