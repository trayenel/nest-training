import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDataDTO } from '@nest-training/shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  getHello(@Body() loginData: LoginDataDTO): Observable<any> {
    return this.authService.login(loginData);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('/login')
  getHello2(@Body() loginData: LoginDataDTO): Observable<any> {
    return this.authService.login(loginData);
  }
}
