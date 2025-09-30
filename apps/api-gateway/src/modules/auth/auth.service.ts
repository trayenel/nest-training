import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginDataDTO } from '@nest-training/shared';
import { catchError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  login(loginData: LoginDataDTO) {
    const pattern = { cmd: 'login' };

    return this.authClient
      .send(pattern, {
        username: loginData.username,
        password: loginData.password,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
