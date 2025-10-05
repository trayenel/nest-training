import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  LoginDataDto,
  ResponseMessageDto,
  UserRequestDto,
  UserResponseDto,
} from '@nest-training/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getAllUsers' })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'getUserByUUID' })
  async getUserByUUID(@Payload() userUUID: string): Promise<UserResponseDto> {
    return await this.userService.getUserByUUID(userUUID);
  }

  @MessagePattern({ cmd: 'getUserByName' })
  async getUserByUsername(
    @Payload() username: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByName(username);
  }

  @MessagePattern({ cmd: 'deleteUserByUUID' })
  async deleteUserByUUID(
    @Payload() userUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.userService.deleteUserByUUID(userUUID);
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() user: LoginDataDto): Promise<UserResponseDto> {
    return await this.userService.createUser(user);
  }

  @MessagePattern({ cmd: 'addUserRole' })
  async addUserRole(
    @Payload() data: { userUUID: string; roleUUID: string },
  ): Promise<UserResponseDto> {
    return await this.userService.addUserRole(data.userUUID, data.roleUUID);
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(
    @Payload() data: { userUUID: string; user: UserRequestDto },
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(data.userUUID, data.user);
  }

  @MessagePattern({ cmd: 'patchUser' })
  async patchUser(
    @Payload() data: { userUUID: string; user: UserRequestDto },
  ): Promise<UserResponseDto> {
    return await this.userService.patchUser(data.userUUID, data.user);
  }

  @MessagePattern({ cmd: 'removeUserRole' })
  async removeUserRole(
    @Payload() data: { userUUID: string; roleUUID: string },
  ): Promise<ResponseMessageDto> {
    return await this.userService.removeUserRole(data.userUUID, data.roleUUID);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  async getUserByEmail(
    @Payload() email: string,
  ): Promise<UserResponseDto | null> {
    return await this.userService.getUserByEmail(email);
  }
}
