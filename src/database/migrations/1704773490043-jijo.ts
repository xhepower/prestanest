import { MigrationInterface, QueryRunner } from "typeorm";

export class Jijo1704773490043 implements MigrationInterface {
    name = 'Jijo1704773490043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pago" ("id" SERIAL NOT NULL, "monto" numeric(10,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "prestamoId" integer, CONSTRAINT "PK_6be14be998d5e41f10e58c0e651" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pago" ADD CONSTRAINT "FK_86d0ae1d4dd663c024417a590fb" FOREIGN KEY ("prestamoId") REFERENCES "prestamo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pago" DROP CONSTRAINT "FK_86d0ae1d4dd663c024417a590fb"`);
        await queryRunner.query(`DROP TABLE "pago"`);
    }

}
