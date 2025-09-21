import { databaseProviders } from './providers/database.providers';
import { Module } from '@nestjs/common';

@Module({
  exports: [...databaseProviders],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
