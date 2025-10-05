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
import { UsersService } from './users.service';
import {
  RegisterDataDto,
  ResponseMessageDto,
  UserRequestDto,
  UserResponseDto,
} from '@nest-training/shared';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:userUUID')
  async getUserByUUID(
    @Param('userUUID') userUUID: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByUUID(userUUID);
  }
  @Get(':username')
  async getUserByName(
    @Param('username') username: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByName(username);
  }

  @Get(':email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByEmail(email);
  }

  @Post()
  async createUser(
    @Body() userDetails: RegisterDataDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(userDetails);
  }
  @Put('/:userUUID')
  async updateUser(
    @Param('userUUID', ParseUUIDPipe) userUUID: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userUUID, user);
  }

  @Patch('/:userUUID')
  async patchUser(
    @Param('userUUID', ParseUUIDPipe) userUUID: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.patchUser(userUUID, user);
  }

  @Delete('/:userUUID')
  async deleteUserByUUID(
    @Param('userUUID') userUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.userService.deleteUserByUUID(userUUID);
  }

  @Post('/:userUUID/role/:roleUUID')
  async addRoleToUser(
    @Param('userUUID') userUUID: string,
    @Param('roleUUID') roleUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.userService.addUserRole(userUUID, roleUUID);
  }

  @Delete('/:userUUID/role/:roleUUID')
  async deleteRoleFromUser(
    @Param('userUUID') userUUID: string,
    @Param('roleUUID') roleUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.userService.removeUserRole(userUUID, roleUUID);
  }
}
