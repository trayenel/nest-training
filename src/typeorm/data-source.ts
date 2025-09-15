import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'postgres',
  schema: process.env.DATABASE_SCHEMA,
  entities: [__dirname + '/entities/**/*.entity.ts}'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  synchronize: false,
});
