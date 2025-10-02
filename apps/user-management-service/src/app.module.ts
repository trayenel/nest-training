import { Module } from '@nestjs/common';
import { DatabaseModule } from './typeorm/database.module';
import { UsersModule } from './modules/users/user.module';
import { ActionModule } from './modules/actions/action.module';
import { RoleModule } from './modules/roles/role.module';

@Module({
  imports: [DatabaseModule, UsersModule, RoleModule, ActionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
