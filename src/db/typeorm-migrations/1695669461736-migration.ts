import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695669461736 implements MigrationInterface {
    name = 'Migration1695669461736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`task\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL, \`user_Id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_40760cd96f08e4a1f4a0546a9c1\` FOREIGN KEY (\`user_Id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_40760cd96f08e4a1f4a0546a9c1\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
