import { UserService } from './user.service.js';
import { ActionsEnum } from '../../shared/models/enums/actions.enum.js';
import { RequireAction } from '../../shared/decorators/actions.decorator.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserRequestDto } from './dto/userRequest.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RequireAction(ActionsEnum.READ_USER)
  @Get('/')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @RequireAction(ActionsEnum.READ_USER)
  @Get('/:userUUID')
  async getUserById(
    @Param('userUUID') userUUID: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserById(userUUID);
  }

  @RequireAction(ActionsEnum.READ_USER)
  @Get('/:userName')
  async getUserByUsername(
    @Param('userName') userName: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserById(userName);
  }

  @RequireAction(ActionsEnum.DELETE_USER)
  @Delete('/:userUUID')
  async deleteUser(
    @Param('userUUID', ParseUUIDPipe) userUUID: string,
  ): Promise<void> {
    return await this.userService.deleteUserById(userUUID);
  }

  @RequireAction(ActionsEnum.CREATE_USER)
  @Post('/')
  async createUser(@Body() user: UserRequestDto): Promise<UserRequestDto> {
    return await this.userService.createUser(user);
  }

  @Post('/:userUUID/role/:roleUUID')
  async addRoleToUser(
    @Param('userUUID') userUUID: string,
    @Param('roleUUID') roleUUID: string,
  ): Promise<UserResponseDto> {
    return await this.userService.addUserRole(userUUID, roleUUID);
  }

  @RequireAction(ActionsEnum.UPDATE_USER)
  @Put('/:userUUID')
  async updateUser(
    @Param('userUUID', ParseUUIDPipe) userUUID: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userUUID, user);
  }

  @RequireAction(ActionsEnum.UPDATE_USER)
  @Patch('/:userUUID')
  async patchUser(
    @Param('userUUID', ParseUUIDPipe) userUUID: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.patchUser(userUUID, user);
  }

  @Delete('/:userUUID/role/:roleUUID')
  async deleteRole(
    @Param('userUUID') userUUID: string,
    @Param('roleUUID') roleUUID: string,
  ): Promise<{ message: string }> {
    return await this.userService.removeUserRole(userUUID, roleUUID);
  }
}
