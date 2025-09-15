import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { DatabaseModule } from '../../typeorm/database.module.js';
import {userProviders} from '../../typeorm/providers/user.providers.js';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
