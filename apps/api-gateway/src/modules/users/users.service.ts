import { Inject, Injectable } from '@nestjs/common';
import { RegisterDataDto, UserResponseDto } from '@nest-training/shared';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async getUserByName(username: string): Promise<UserResponseDto> {
    const pattern = { cmd: 'getUserByName' };
    return await lastValueFrom(this.userClient.send(pattern, username));
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const pattern = { cmd: 'getUserByEmail' };
    return await lastValueFrom(this.userClient.send(pattern, email));
  }

  async createUser(userDetails: RegisterDataDto): Promise<UserResponseDto> {
    const pattern = { cmd: 'createUser' };
    return await lastValueFrom(this.userClient.send(pattern, userDetails));
  }
}
