import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { actionProviders } from './action.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActionController],
  providers: [ActionService, ...actionProviders],
})
export class ActionModule {}
