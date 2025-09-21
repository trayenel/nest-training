import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { ActionModule } from './modules/actions/action.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RoleModule,
    ActionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
