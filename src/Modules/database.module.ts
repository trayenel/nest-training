import { Module } from '@nestjs/common';
import { databaseProviders } from '../Providers/database.providers';

@Module({
  exports: [...databaseProviders],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
