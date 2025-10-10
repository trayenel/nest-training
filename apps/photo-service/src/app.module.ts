import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';
import { ActionModule } from './modules/actions/action.module';
import { RoleModule } from './modules/roles/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@nest-training/shared';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    UsersModule,
    RoleModule,
    ActionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
