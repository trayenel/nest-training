import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { ActionModule } from './actions/action.module';
import { UserActionModule } from './user-actions/userAction.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ActionModule,
    UserActionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
