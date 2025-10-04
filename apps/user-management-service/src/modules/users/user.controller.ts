import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ActionsEnum,
  LoginDataDto,
  RequireAction,
  UserRequestDto,
  UserResponseDto,
} from '@nest-training/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getAllUsers' })
  @RequireAction(ActionsEnum.READ_USER)
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'getUserById' })
  @RequireAction(ActionsEnum.READ_USER)
  async getUserById(@Payload() userUUID: string): Promise<UserResponseDto> {
    return await this.userService.getUserById(userUUID);
  }

  @MessagePattern({ cmd: 'getUserByName' })
  async getUserByUsername(
    @Payload() username: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByName(username);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  @RequireAction(ActionsEnum.DELETE_USER)
  async deleteUser(@Payload() userUUID: string): Promise<void> {
    return await this.userService.deleteUserById(userUUID);
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() user: LoginDataDto): Promise<UserResponseDto> {
    return await this.userService.createUser(user);
  }

  @MessagePattern({ cmd: 'addRoleToUser' })
  async addRoleToUser(
    @Payload() data: { userUUID: string; roleUUID: string },
  ): Promise<UserResponseDto> {
    return await this.userService.addUserRole(data.userUUID, data.roleUUID);
  }

  @MessagePattern({ cmd: 'updateUser' })
  @RequireAction(ActionsEnum.UPDATE_USER)
  async updateUser(
    @Payload() data: { userUUID: string; user: UserRequestDto },
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(data.userUUID, data.user);
  }

  @MessagePattern({ cmd: 'patchUser' })
  @RequireAction(ActionsEnum.UPDATE_USER)
  async patchUser(
    @Payload() data: { userUUID: string; user: UserRequestDto },
  ): Promise<UserResponseDto> {
    return await this.userService.patchUser(data.userUUID, data.user);
  }

  @MessagePattern({ cmd: 'removeUserRole' })
  async removeUserRole(
    @Payload() data: { userUUID: string; roleUUID: string },
  ): Promise<{ message: string }> {
    return await this.userService.removeUserRole(data.userUUID, data.roleUUID);
  }
}
