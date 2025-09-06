import { Module } from '@nestjs/common';
import { UsersModule } from './Modules/user.module';
import { ActionModule } from './Modules/action.module';
import { UserActionModule } from './Modules/userAction.module';

@Module({
  imports: [UsersModule, ActionModule, UserActionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
