import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { LoginDataDTO } from '../dto/loginData.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  login(loginData: LoginDataDTO) {
    const pattern = { cmd: 'login' };

    return this.authService
      .send(pattern, {
        username: loginData.username,
        password: loginData.password,
      })
      .pipe(map((res) => res));
  }
}
