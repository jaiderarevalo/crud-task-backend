import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695706421428 implements MigrationInterface {
    name = 'Migration1695706421428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`status\` tinyint NOT NULL`);
    }

}
