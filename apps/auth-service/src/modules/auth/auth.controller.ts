import {
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserResponseDto } from '@nest-training/shared/dist';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() data): Promise<any> {
    const user: UserResponseDto = await this.authService.validateUser(
      data.username,
      data.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.authService.login(user);
  }
}
