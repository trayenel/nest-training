import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module.js';
import { ActionModule } from './modules/actions/action.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/roles/role.module.js';

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
