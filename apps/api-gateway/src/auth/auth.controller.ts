import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LoginDataDTO } from '../dto/loginData.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  getHello(@Body() loginData: LoginDataDTO): Observable<any> {
    return this.authService.login(loginData);
  }
}
