import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity.js';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleEntity),
    inject: ['DATA_SOURCE'],
  },
];
