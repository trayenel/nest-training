import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: '192.168.0.103',
        port: 5432,
        username: 'root',
        password: '1234',
        database: 'postgres',
        schema: 'test',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
