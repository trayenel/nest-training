import { Module } from '@nestjs/common';
import { DatabaseModule } from '@nest-training/shared';
import { UsersModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { ActionModule } from './modules/actions/action.module';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(process.cwd(), '.env'),
    }),
    DatabaseModule,
    UsersModule,
    RoleModule,
    ActionModule,
  ],
  controllers: [],
  providers: [],
})
export class UserManagementServiceModule {}
