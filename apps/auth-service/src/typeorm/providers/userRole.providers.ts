import { UserRoleEntity } from '../entities/userRole.entity';
import { DataSource } from 'typeorm';

export const userRoleProviders = [
  {
    provide: 'USER_ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserRoleEntity),
    inject: ['DATA_SOURCE'],
  },
];
