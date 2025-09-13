import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { ActionModule } from './actions/action.module';
import { UserActionModule } from './user-actions/userAction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, ActionModule, UserActionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
