import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'node:url';
import * as path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource: DataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: 'postgres',
        schema: configService.get<string>('DATABASE_SCHEMA'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/**/*.ts'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
