import { Inject, Injectable } from '@nestjs/common';
import {
  RegisterDataDto,
  UserResponseDto,
  UserRequestDto,
  RpcErrorResponseDto,
  ResponseMessageDto,
} from '@nest-training/shared';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async getUserByName(username: string): Promise<UserResponseDto> {
    const pattern = { cmd: 'getUserByName' };
    return (await lastValueFrom(this.userClient.send(pattern, username)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as UserResponseDto;
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const pattern = { cmd: 'getUserByEmail' };
    return (await lastValueFrom(this.userClient.send(pattern, email)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as UserResponseDto;
  }

  async createUser(userDetails: RegisterDataDto): Promise<UserResponseDto> {
    const pattern = { cmd: 'createUser' };
    return (await lastValueFrom(
      this.userClient.send(pattern, userDetails),
    ).catch((err: RpcErrorResponseDto) => {
      throw new RpcException(err);
    })) as UserResponseDto;
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const pattern = { cmd: 'getAllUsers' };
    return (await lastValueFrom(this.userClient.send(pattern, {})).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as UserResponseDto[];
  }

  async getUserByUUID(userUUID: string): Promise<UserResponseDto> {
    const pattern = { cmd: 'getUserByUUID' };
    return (await lastValueFrom(this.userClient.send(pattern, userUUID)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as UserResponseDto;
  }

  async deleteUserByUUID(userUUID: string): Promise<ResponseMessageDto> {
    const pattern = { cmd: 'deleteUserByUUID' };
    return (await lastValueFrom(this.userClient.send(pattern, userUUID)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as ResponseMessageDto;
  }

  async addUserRole(
    userUUID: string,
    roleUUID: string,
  ): Promise<ResponseMessageDto> {
    const pattern = { cmd: 'addUserRole' };
    const data = { userUUID, roleUUID };
    return (await lastValueFrom(this.userClient.send(pattern, data)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as ResponseMessageDto;
  }

  async updateUser(
    userUUID: string,
    user: UserRequestDto,
  ): Promise<UserResponseDto> {
    const pattern = { cmd: 'updateUser' };
    const data = { userUUID, user };
    return (await lastValueFrom(this.userClient.send(pattern, data)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as UserResponseDto;
  }

  async patchUser(
    userUUID: string,
    user: UserRequestDto,
  ): Promise<UserResponseDto> {
    const pattern = { cmd: 'patchUser' };
    const data = { userUUID, user };
    return (await lastValueFrom(this.userClient.send(pattern, data)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as UserResponseDto;
  }

  async removeUserRole(
    userUUID: string,
    roleUUID: string,
  ): Promise<ResponseMessageDto> {
    const pattern = { cmd: 'removeUserRole' };
    const data = { userUUID, roleUUID };
    return (await lastValueFrom(this.userClient.send(pattern, data)).catch(
      (err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      },
    )) as ResponseMessageDto;
  }
}
