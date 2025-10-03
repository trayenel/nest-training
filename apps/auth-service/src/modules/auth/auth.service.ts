import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginDataDto,
  RpcErrorResponseDto,
  UserResponseDto,
} from '@nest-training/shared';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDetails: LoginDataDto): Promise<UserResponseDto> {
    const pattern = { cmd: 'getUserByName' };
    const errorObject: RpcErrorResponseDto = {
      message: 'Invalid username or password',
      error: 'Unauthorized',
      statusCode: 401,
    };

    try {
      const user: UserResponseDto = await lastValueFrom(
        this.userClient.send(pattern, userDetails.username),
      );

      if (user?.password != userDetails.password) {
        throw new RpcException(errorObject);
      }

      return user;
    } catch {
      throw new RpcException(errorObject);
    }
  }

  login(user: UserResponseDto): any {
    const payload = { sub: user.userId, username: user.name };

    return { access_token: this.jwtService.sign(payload) };
  }

  async registerUser(userDetails: LoginDataDto) {
    const pattern = { cmd: 'getUserByName' };

    const user: UserResponseDto = await lastValueFrom(
      this.userClient.send(pattern, userDetails.username),
    );

    if (user) {
      const errorObject: RpcErrorResponseDto = {
        message: 'Username is already taken',
        error: 'Conflict',
        statusCode: 409,
      };
      throw new RpcException(errorObject);
    }

    pattern.cmd = 'createUser';

    const createdUser: UserResponseDto = await lastValueFrom(
      this.userClient.send(pattern, userDetails),
    );

    return createdUser;
  }
}
