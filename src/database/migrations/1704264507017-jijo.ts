import { MigrationInterface, QueryRunner } from "typeorm";

export class Jijo1704264507017 implements MigrationInterface {
    name = 'Jijo1704264507017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "cuota" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "cuota"`);
    }

}
