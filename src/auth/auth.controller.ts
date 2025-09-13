import { Controller, Post, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async logout(@Request() req): Promise<any> {
    return req.logout();
  }
}
