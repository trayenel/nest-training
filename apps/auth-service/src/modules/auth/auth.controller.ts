import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  LoginDataDto,
  RegisterDataDto,
  UserResponseDto,
} from '@nest-training/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() data: LoginDataDto): Promise<any> {
    const user: UserResponseDto = await this.authService.validateUser(data);

    return await this.authService.login(user);
  }

  @MessagePattern({ cmd: 'register' })
  async register(
    @Payload() userDetails: RegisterDataDto,
  ): Promise<UserResponseDto | undefined> {
    return await this.authService.registerUser(userDetails);
  }
}
