import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_VENDOR,
  schema: process.env.DATABASE_SCHEMA,
  entities: [__dirname + '/entities/**/*.entity.ts}'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  synchronize: false,
});
