import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginDataDto } from '@nest-training/shared';
import { catchError, throwError } from 'rxjs';

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
}
