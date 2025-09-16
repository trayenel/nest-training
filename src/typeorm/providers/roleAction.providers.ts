import { DataSource } from 'typeorm';
import { RoleActionEntity } from '../entities/roleAction.entity';

export const roleActionProviders = [
  {
    provide: 'ROLEACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleActionEntity),
    inject: ['DATA_SOURCE'],
  },
];
