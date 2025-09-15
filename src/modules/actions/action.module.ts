import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { actionProviders } from '../../typeorm/providers/action.providers';
import { DatabaseModule } from '../../typeorm/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ActionController],
  providers: [ActionService, ...actionProviders],
})
export class ActionModule {}
