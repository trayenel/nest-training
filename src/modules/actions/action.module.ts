import { Module } from '@nestjs/common';
import { ActionController } from './action.controller.js';
import { ActionService } from './action.service.js';
import { actionProviders } from '../../typeorm/providers/action.providers.js';
import { DatabaseModule } from '../../typeorm/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ActionController],
  providers: [ActionService, ...actionProviders],
})
export class ActionModule {}
