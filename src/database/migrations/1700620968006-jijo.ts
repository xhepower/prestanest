import { MigrationInterface, QueryRunner } from 'typeorm';

export class Jijo1700620968006 implements MigrationInterface {
  name = 'Jijo1700620968006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'cobrador')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'cobrador', "recoveryToken" text, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ruta" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "UQ_18f8c81fad715827e707df162d7" UNIQUE ("name"), CONSTRAINT "PK_0cc6eb7ab543d3367ef7848c88f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ruta" ADD CONSTRAINT "FK_095628bb2f5c4d8f6f9c814710a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ruta" DROP CONSTRAINT "FK_095628bb2f5c4d8f6f9c814710a"`,
    );
    await queryRunner.query(`DROP TABLE "ruta"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
