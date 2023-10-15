import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695259909750 implements MigrationInterface {
    name = 'Migration1695259909750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`active\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`active\` tinyint NOT NULL`);
    }

}
