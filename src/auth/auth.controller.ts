import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { SignInDTO } from './dto/SignInDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  async logIn(@Body() signInDto: SignInDTO): Promise<any> {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }
}
