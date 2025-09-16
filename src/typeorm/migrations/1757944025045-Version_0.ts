import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version01757944025045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('SET SEARCH_PATH = app;');

    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`
        CREATE TABLE users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(50) UNIQUE,
          password VARCHAR(255) NOT NULL, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await queryRunner.query(`
        CREATE TABLE action (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(25) UNIQUE NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await queryRunner.query(`
        CREATE TABLE role (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(10) UNIQUE NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await queryRunner.query(`
        CREATE TABLE user_role (
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          role_id UUID REFERENCES role(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (user_id, role_id)
        )
      `);

      await queryRunner.query(`
        CREATE TABLE role_action (
          role_id UUID REFERENCES role(id) ON DELETE CASCADE,
          action_id UUID REFERENCES action(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (role_id, action_id)
        )
      `);

      // Insert initial data
      await queryRunner.query(`
        INSERT INTO role (name, description) VALUES 
        ('ADMIN', 'Administrator with full access'),
        ('MANAGER', 'Manager with elevated permissions'),
        ('USER', 'Regular user')
      `);

      await queryRunner.query(`
        INSERT INTO action (name, description) VALUES 
        ('CREATE_USER', 'Create new users'),
        ('UPDATE_USER', 'Update existing users'),
        ('DELETE_USER', 'Delete users'),
        ('READ_USER', 'View user information'),
        ('CREATE_ACTION', 'Create new actions'),
        ('UPDATE_ACTION', 'Update existing actions'),
        ('DELETE_ACTION', 'Delete actions'),
        ('READ_ACTION', 'View action information'),
        ('CREATE_ROLE', 'Create new roles'),
        ('UPDATE_ROLE', 'Update existing roles'),
        ('DELETE_ROLE', 'Delete roles'),
        ('READ_ROLE', 'View role information')
      `);

      await queryRunner.query(
        `
        WITH actions as (SELECT id FROM action),
        admin_role as (SELECT id FROM role WHERE name = 'ADMIN')
        INSERT INTO role_action (role_id, action_id) SELECT admin_role.id, actions.id FROM admin_role, actions;
        `,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('SET SEARCH_PATH = app;');

    await queryRunner.startTransaction();

    try {
      await queryRunner.query('DROP TABLE IF EXISTS role_action CASCADE');
      await queryRunner.query('DROP TABLE IF EXISTS user_role CASCADE');
      await queryRunner.query('DROP TABLE IF EXISTS action CASCADE');
      await queryRunner.query('DROP TABLE IF EXISTS role CASCADE');
      await queryRunner.query('DROP TABLE IF EXISTS users CASCADE');

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
