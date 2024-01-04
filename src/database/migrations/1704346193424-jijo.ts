import { MigrationInterface, QueryRunner } from "typeorm";

export class Jijo1704346193424 implements MigrationInterface {
    name = 'Jijo1704346193424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" ADD "porcentajemora" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestamo" DROP COLUMN "porcentajemora"`);
    }

}
