import { MigrationInterface, QueryRunner } from "typeorm";

export class Jijo1701062728648 implements MigrationInterface {
    name = 'Jijo1701062728648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plazo" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "plazo" numeric(10,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_53917db85cad89a715bb3bfc4eb" UNIQUE ("name"), CONSTRAINT "PK_c51f72fc6b16b0dc1709098a6b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prestamo" ("id" SERIAL NOT NULL, "capital" numeric(10,2) NOT NULL DEFAULT '0', "fechaInicio" date NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "fechaVencimiento" date NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "clienteId" integer, "plazoId" integer, CONSTRAINT "PK_f278f946a735410406b7d965b2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'cobrador')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'cobrador', "recoveryToken" text, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ruta" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "UQ_18f8c81fad715827e707df162d7" UNIQUE ("name"), CONSTRAINT "PK_0cc6eb7ab543d3367ef7848c88f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "dni" character varying(255) NOT NULL, "city" character varying(255), "hood" character varying(255), "business" character varying(255), "phone1" character varying(255), "phone2" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "rutaId" integer, CONSTRAINT "UQ_251e72e84b60a37771db18f2c6d" UNIQUE ("dni"), CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD CONSTRAINT "FK_2d505983661fa12327155243cfa" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prestamo" ADD CONSTRAINT "FK_397aa96132631c90abd55251839" FOREIGN KEY ("plazoId") REFERENCES "plazo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ruta" ADD CONSTRAINT "FK_095628bb2f5c4d8f6f9c814710a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD CONSTRAINT "FK_40535456a107583a489e295000a" FOREIGN KEY ("rutaId") REFERENCES "ruta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "FK_40535456a107583a489e295000a"`);
        await queryRunner.query(`ALTER TABLE "ruta" DROP CONSTRAINT "FK_095628bb2f5c4d8f6f9c814710a"`);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP CONSTRAINT "FK_397aa96132631c90abd55251839"`);
        await queryRunner.query(`ALTER TABLE "prestamo" DROP CONSTRAINT "FK_2d505983661fa12327155243cfa"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "ruta"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "prestamo"`);
        await queryRunner.query(`DROP TABLE "plazo"`);
    }

}
