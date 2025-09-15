import { Module } from '@nestjs/common';
import { RoleController } from './role.controller.js';
import { RoleService } from './role.service.js';
import { DatabaseModule } from '../../typeorm/database.module.js';
import { roleProviders } from '../../typeorm/providers/role.providers.js';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
})
export class RoleModule {}
