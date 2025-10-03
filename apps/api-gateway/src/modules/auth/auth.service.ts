import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginDataDto } from '@nest-training/shared';
import { catchError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  login(loginData: LoginDataDto) {
    const pattern = { cmd: 'login' };

    return this.authClient.send(pattern, loginData).pipe(
      catchError((err: RpcException) => {
        throw new RpcException(err);
      }),
    );
  }

  register(loginData: LoginDataDto) {
    const pattern = { cmd: 'register' };

    console.log(loginData);
    return this.authClient.send(pattern, loginData).pipe(
      catchError((err: RpcException) => {
        throw new RpcException(err);
      }),
    );
  }
}
