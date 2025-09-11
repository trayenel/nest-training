import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from 'src/users/user.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'lol',
      signOptions: { expiresIn: '10s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders],
})
export class AuthModule {}
