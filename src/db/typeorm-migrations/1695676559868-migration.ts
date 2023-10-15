import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695676559868 implements MigrationInterface {
    name = 'Migration1695676559868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_40760cd96f08e4a1f4a0546a9c1\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`user_Id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_db55af84c226af9dce09487b61b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_db55af84c226af9dce09487b61b\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`user_id\` \`user_Id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_40760cd96f08e4a1f4a0546a9c1\` FOREIGN KEY (\`user_Id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
