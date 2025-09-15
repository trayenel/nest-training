import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';
import { ActionModule } from './modules/actions/action.module';
import { RoleActionModule } from './modules/role-actions/roleAction.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/roles/role.module';

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
