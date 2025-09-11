import { Module } from '@nestjs/common';
import { databaseProviders } from '../common/providers/database.providers';

@Module({
  exports: [...databaseProviders],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
