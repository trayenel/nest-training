import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '../../../../shared/decorators/public.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserResponseDto } from '../../../../shared/dto/userResponse.dto';

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
