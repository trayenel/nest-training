import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version01757944025045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET SEARCH_PATH = app;');
    await queryRunner.startTransaction();

    try {
      // USERS TABLE
      await queryRunner.query(`
        CREATE TABLE users (
          id UUID DEFAULT gen_random_uuid(),
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(50) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          bio VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT user_id_pk PRIMARY KEY (id)
        )
      `);

      // ACTION TABLE
      await queryRunner.query(`
        CREATE TABLE action (
          id UUID DEFAULT gen_random_uuid(),
          name VARCHAR(25) UNIQUE NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT action_id_pk PRIMARY KEY (id)
        )
      `);

      // ROLE TABLE
      await queryRunner.query(`
        CREATE TABLE role (
          id UUID DEFAULT gen_random_uuid(),
          name VARCHAR(10) UNIQUE NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT role_id_pk PRIMARY KEY (id)
        )
      `);

      // USER_ROLE TABLE
      await queryRunner.query(`
        CREATE TABLE user_role (
          user_id UUID NOT NULL,
          role_id UUID NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT user_role_pk PRIMARY KEY (user_id, role_id),
          CONSTRAINT user_role_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          CONSTRAINT user_role_role_id_fk FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
        )
      `);

      // ROLE_ACTION TABLE
      await queryRunner.query(`
        CREATE TABLE role_action (
          role_id UUID NOT NULL,
          action_id UUID NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT role_action_pk PRIMARY KEY (role_id, action_id),
          CONSTRAINT role_action_role_id_fk FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
          CONSTRAINT role_action_action_id_fk FOREIGN KEY (action_id) REFERENCES action(id) ON DELETE CASCADE
        )
      `);

      // INSERT INITIAL ROLES
      await queryRunner.query(`
        INSERT INTO role (name, description) VALUES 
        ('ADMIN', 'Administrator with full access'),
        ('MANAGER', 'Manager with elevated permissions'),
        ('USER', 'Regular user')
      `);

      // INSERT INITIAL ACTIONS
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
        ('READ_ROLE', 'View role information'),
        ('REMOVE_ROLE_ACTION', 'Remove an action from a role'),
        ('REMOVE_USER_ROLE', 'Remove a role from a user'),
        ('CREATE_ROLE_ACTION', 'Assign an action to a role'),
        ('CREATE_USER_ROLE', 'Assign a role to a user')
      `);

      // GRANT ALL ACTIONS TO ADMIN ROLE
      await queryRunner.query(`
        WITH actions AS (SELECT id FROM action),
        admin_role AS (SELECT id FROM role WHERE name = 'ADMIN')
        INSERT INTO role_action (role_id, action_id)
        SELECT admin_role.id, actions.id FROM admin_role, actions;
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET SEARCH_PATH = app;');
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
