import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ActionModule } from './modules/action/action.module';
import { FileModule } from './modules/file/file.module';
import { resolve } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(process.cwd(), '.env'),
    }),
    AuthModule,
    UsersModule,
    ActionModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
