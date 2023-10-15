import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695708631216 implements MigrationInterface {
    name = 'Migration1695708631216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`status\` tinyint NOT NULL`);
    }

}
