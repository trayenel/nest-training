import { ActionEntity } from '../entities/action.entity';
import { DataSource } from 'typeorm';

export const actionProviders = [
  {
    provide: 'ACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ActionEntity),
    inject: ['DATA_SOURCE'],
  },
];
