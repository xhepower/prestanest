import { MigrationInterface, QueryRunner } from "typeorm";

export class Jijo1704341995134 implements MigrationInterface {
    name = 'Jijo1704341995134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "intereses" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "total" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "intereses"`);
    }

}
