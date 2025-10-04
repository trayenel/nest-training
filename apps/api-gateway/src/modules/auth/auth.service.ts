import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  LoginDataDto,
  RegisterDataDto,
  RpcErrorResponseDto,
} from '@nest-training/shared';
import { catchError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  login(userDetails: LoginDataDto) {
    const pattern = { cmd: 'login' };
    return this.authClient.send(pattern, userDetails).pipe(
      catchError((err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      }),
    );
  }

  register(userDetails: RegisterDataDto) {
    const pattern = { cmd: 'register' };
    return this.authClient.send(pattern, userDetails).pipe(
      catchError((err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      }),
    );
  }
}
