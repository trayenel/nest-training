import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from 'src/users/user.providers';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({ secret: 'lol', signOptions: { expiresIn: '60s' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
