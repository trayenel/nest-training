import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3301 },
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({ secret: 'lol', signOptions: { expiresIn: '1h' } }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
