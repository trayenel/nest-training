import { RoleActionEntity } from '../entities/roleAction.entity';
import { DataSource } from 'typeorm';

export const roleActionProviders = [
  {
    provide: 'ROLE_ACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleActionEntity),
    inject: ['DATA_SOURCE'],
  },
];
