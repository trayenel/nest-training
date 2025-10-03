import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LoginDataDto } from '@nest-training/shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  getHello(@Body() loginData: LoginDataDto): Observable<any> {
    return this.authService.login(loginData);
  }

  @HttpCode(201)
  @Post('/register')
  register(@Body() loginData: LoginDataDto): Observable<any> {
    return this.authService.register(loginData);
  }
}
