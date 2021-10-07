import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUniqueToBook1629294938451 implements MigrationInterface {
  name = 'AddedUniqueToBook1629294938451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "UQ_d792c8bbf8ffa8b11318221937f" UNIQUE ("title", "image")`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "UQ_b9b99f6dc307fe267fd502d569e" UNIQUE ("title", "vendor")`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "UQ_8853954591ca7a620bdf0992093" UNIQUE ("title", "format")`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "UQ_c4fc3d6345d66d6f842aea401df" UNIQUE ("title", "numberOfPages")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_c4fc3d6345d66d6f842aea401df"`);
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_8853954591ca7a620bdf0992093"`);
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_b9b99f6dc307fe267fd502d569e"`);
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_d792c8bbf8ffa8b11318221937f"`);
  }
}
