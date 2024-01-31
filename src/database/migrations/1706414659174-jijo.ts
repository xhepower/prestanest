import { MigrationInterface, QueryRunner } from "typeorm";

export class Jijo1706414659174 implements MigrationInterface {
    name = 'Jijo1706414659174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pago" ADD "fecha" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pago" DROP COLUMN "fecha"`);
    }

}
