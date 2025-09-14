import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { ActionModule } from './actions/action.module';
import { RoleActionModule } from './role-actions/roleAction.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RoleModule,
    ActionModule,
    RoleActionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
