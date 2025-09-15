import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';

@Module({
  exports: [...databaseProviders],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
