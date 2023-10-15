import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695706584045 implements MigrationInterface {
    name = 'Migration1695706584045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`status\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`status\``);
    }

}
