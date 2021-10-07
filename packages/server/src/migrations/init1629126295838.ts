import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration implements MigrationInterface {
  name = 'init1629126295838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40) NOT NULL, CONSTRAINT "UQ_9dc496f2e5b912da9edd2aa4455" UNIQUE ("name"), CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "price" double precision NOT NULL, "discount" double precision NOT NULL, "ageLimit" integer NOT NULL, "publicationYear" integer NOT NULL, "numberOfPages" integer NOT NULL, "format" integer array NOT NULL, "vendor" character varying(15) NOT NULL, "rating" double precision NOT NULL, "image" character varying, "categoryId" uuid, "publisherId" uuid, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_d3962fd11a54d87f927e84d1080" UNIQUE ("name"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "basket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "price" double precision NOT NULL, "totalPrice" double precision NOT NULL, "isCompleted" boolean NOT NULL, CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "basket_line" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "total" double precision NOT NULL, "defaultPrice" double precision NOT NULL, "discount" double precision NOT NULL, "bookId" uuid, "basketId" uuid, CONSTRAINT "REL_4f3dc6b6a08640c5e8970d3918" UNIQUE ("bookId"), CONSTRAINT "REL_2f5b3896239573bbdd6ff135aa" UNIQUE ("basketId"), CONSTRAINT "PK_611695c4d4ee37e9bef7c79b71e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author-book" ("bookId" uuid NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_c8ca43dfceb9eaf3f513d8b9783" PRIMARY KEY ("bookId", "authorId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_eada6a665a5b8b56048815319e" ON "author-book" ("bookId") `);
    await queryRunner.query(`CREATE INDEX "IDX_66daa4ece882a4e11039056ae3" ON "author-book" ("authorId") `);
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_b8988524dd01b5dcb67b4b3ede7" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket_line" ADD CONSTRAINT "FK_4f3dc6b6a08640c5e8970d39189" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "basket_line" ADD CONSTRAINT "FK_2f5b3896239573bbdd6ff135aa8" FOREIGN KEY ("basketId") REFERENCES "basket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "author-book" ADD CONSTRAINT "FK_eada6a665a5b8b56048815319e1" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "author-book" ADD CONSTRAINT "FK_66daa4ece882a4e11039056ae36" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "author-book" DROP CONSTRAINT "FK_66daa4ece882a4e11039056ae36"`);
    await queryRunner.query(`ALTER TABLE "author-book" DROP CONSTRAINT "FK_eada6a665a5b8b56048815319e1"`);
    await queryRunner.query(`ALTER TABLE "basket_line" DROP CONSTRAINT "FK_2f5b3896239573bbdd6ff135aa8"`);
    await queryRunner.query(`ALTER TABLE "basket_line" DROP CONSTRAINT "FK_4f3dc6b6a08640c5e8970d39189"`);
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_b8988524dd01b5dcb67b4b3ede7"`);
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2"`);
    await queryRunner.query(`DROP INDEX "IDX_66daa4ece882a4e11039056ae3"`);
    await queryRunner.query(`DROP INDEX "IDX_eada6a665a5b8b56048815319e"`);
    await queryRunner.query(`DROP TABLE "author-book"`);
    await queryRunner.query(`DROP TABLE "basket_line"`);
    await queryRunner.query(`DROP TABLE "basket"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "publisher"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
