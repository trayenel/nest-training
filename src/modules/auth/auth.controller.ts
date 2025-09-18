import { Controller, Post, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/logout')
  async logout(@Request() req): Promise<any> {
    return req.logout();
  }
}
