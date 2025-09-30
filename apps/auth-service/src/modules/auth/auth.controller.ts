import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDataDTO, UserResponseDto } from '@nest-training/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() data: LoginDataDTO): Promise<any> {
    const user: UserResponseDto = await this.authService.validateUser(
      data.username,
      data.password,
    );
    return await this.authService.login(user);
  }
}
