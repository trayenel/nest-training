import { Module } from '@nestjs/common';
import { ActionModule } from '../actions/action.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { ActionService } from '../actions/action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RoleEntity,
  ActionEntity,
  RoleActionEntity,
} from '@nest-training/shared';

@Module({
  imports: [
    ActionModule,
    TypeOrmModule.forFeature([RoleEntity, ActionEntity, RoleActionEntity]),
  ],
  controllers: [RoleController],
  providers: [RoleService, ActionService],
})
export class RoleModule {}
