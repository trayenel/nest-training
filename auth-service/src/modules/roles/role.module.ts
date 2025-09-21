import { Module } from '@nestjs/common';
import { RoleController } from './role.controller.js';
import { RoleService } from './role.service.js';
import { DatabaseModule } from '../../typeorm/database.module.js';
import { roleProviders } from '../../typeorm/providers/role.providers.js';
import { ActionModule } from '../actions/action.module';
import { ActionService } from '../actions/action.service';
import { actionProviders } from '../../typeorm/providers/action.providers';
import { roleActionProviders } from '../../typeorm/providers/roleAction.providers';

@Module({
  imports: [DatabaseModule, ActionModule],
  controllers: [RoleController],
  providers: [
    RoleService,
    ActionService,
    ...roleProviders,
    ...actionProviders,
    ...roleActionProviders,
  ],
})
export class RoleModule {}
