import { MigrationInterface, QueryRunner } from "typeorm";

export class Version11760069025048 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET SEARCH_PATH = app;');
    await queryRunner.startTransaction()

    try {
      // PHOTOS TABLE
      await queryRunner.query('CREATE TABLE photo (id UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL, user_id UUID NOT NULL, file_path VARCHAR(255) UNIQUE NOT NULL, CONSTRAINT photo_id_pk PRIMARY KEY (id), CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id))')

      // ADD USER BIO TO USERS TABLE
      await queryRunner.query('ALTER TABLE users ADD COLUMN bio VARCHAR(255)')

      await queryRunner.commitTransaction()
    } catch (error) {
      console.error(error)

      await queryRunner.rollbackTransaction()
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET SEARCH_PATH = app;');
    await queryRunner.startTransaction()

    try {
      await queryRunner.query('DROP TABLE IF EXISTS photo');
      await queryRunner.query('ALTER TABLE users DROP COLUMN IF EXISTS bio')

      await queryRunner.commitTransaction()
    } catch (error) {
      console.error(error)

      await queryRunner.rollbackTransaction()
    }
  }

}
