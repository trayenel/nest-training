import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginDataDto,
  RegisterDataDto,
  RpcErrorResponseDto,
  UserResponseDto,
} from '@nest-training/shared';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  SALT_ROUNDS: number;
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.SALT_ROUNDS = Number(this.configService.get<number>('SALT_ROUNDS'));

    if (!this.SALT_ROUNDS) {
      const errorObject: RpcErrorResponseDto = {
        error: 'Internal server error',
        message: 'Salt rounds not configured',
        statusCode: 500,
      };
      throw new RpcException(errorObject);
    }
  }

  async validateUser(userDetails: LoginDataDto): Promise<UserResponseDto> {
    const pattern = { cmd: 'getUserByName' };

    try {
      const user: UserResponseDto = await lastValueFrom(
        this.userClient.send(pattern, userDetails.username),
      );

      const isMatching: boolean = await bcrypt.compare(
        userDetails.password,
        user.password,
      );

      if (!isMatching) {
        const errorObject: RpcErrorResponseDto = {
          message: 'Invalid username or password',
          error: 'Unauthorized',
          statusCode: 401,
        };

        throw new RpcException(errorObject);
      }

      return user;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException(error as RpcErrorResponseDto);
    }
  }

  login(user: UserResponseDto): any {
    const payload = { sub: user.userId, username: user.username };

    return { access_token: this.jwtService.sign(payload) };
  }

  async registerUser(
    userDetails: RegisterDataDto,
  ): Promise<UserResponseDto | undefined> {
    const pattern = { cmd: 'getUserByName' };
    const errorObject: RpcErrorResponseDto = {
      error: 'Conflict',
      message: '',
      statusCode: 409,
    };
    let user: UserResponseDto;

    // Check if username is taken
    try {
      user = await lastValueFrom(
        this.userClient.send(pattern, userDetails.username),
      );

      if (user) {
        errorObject.message = 'Username is already taken';
        throw new RpcException(errorObject);
      }
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
    // Check if email is taken
    try {
      pattern.cmd = 'getUserByEmail';
      user = await lastValueFrom(
        this.userClient.send(pattern, userDetails.email),
      );

      if (user) {
        errorObject.message = 'Email is already taken';
        throw new RpcException(errorObject);
      }
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
    // Create new user
    pattern.cmd = 'createUser';

    userDetails.password = await bcrypt.hash(
      userDetails.password,
      this.SALT_ROUNDS,
    );

    return await lastValueFrom(this.userClient.send(pattern, userDetails));
  }
}
