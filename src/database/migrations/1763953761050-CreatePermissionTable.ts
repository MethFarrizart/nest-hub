import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePermissionTable1763953761050 implements MigrationInterface {
  name = 'CreatePermissionTable1763953761050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`permission_name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`role_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_383892d758d08d346f837d3d8b7\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_383892d758d08d346f837d3d8b7\``,
    );
    await queryRunner.query(`DROP TABLE \`permission\``);
  }
}
