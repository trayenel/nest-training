import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../typeorm/database.module';
import { ActionModule } from '../actions/action.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { ActionService } from '../actions/action.service';
import { roleProviders } from '../../typeorm/providers/role.providers';
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
