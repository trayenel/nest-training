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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ActionsEnum,
  RegisterDataDto,
  RequireAction,
  ResponseMessageDto,
  UserRequestDto,
  UserResponseDto,
} from '@nest-training/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  @RequireAction(ActionsEnum.READ_USER)
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:userUUID')
  @RequireAction(ActionsEnum.READ_USER)
  async getUserByUUID(
    @Param('userUUID') userUUID: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByUUID(userUUID);
  }

  @Get('name/:username')
  @RequireAction(ActionsEnum.READ_USER)
  async getUserByName(
    @Param('username') username: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByName(username);
  }

  @Get('email/:email')
  @RequireAction(ActionsEnum.READ_USER)
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByEmail(email);
  }

  @Post()
  @RequireAction(ActionsEnum.CREATE_USER)
  async createUser(
    @Body() userDetails: RegisterDataDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(userDetails);
  }

  @Put('/:userUUID')
  @RequireAction(ActionsEnum.UPDATE_USER)
  async updateUser(
    @Param('userUUID', ParseUUIDPipe) userUUID: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userUUID, user);
  }

  @Patch('/:userUUID')
  @RequireAction(ActionsEnum.UPDATE_USER)
  async patchUser(
    @Param('userUUID', ParseUUIDPipe) userUUID: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.patchUser(userUUID, user);
  }

  @Delete('/:userUUID')
  @RequireAction(ActionsEnum.DELETE_USER)
  async deleteUserByUUID(
    @Param('userUUID') userUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.userService.deleteUserByUUID(userUUID);
  }

  @Post('/:userUUID/role/:roleUUID')
  @RequireAction(ActionsEnum.UPDATE_USER)
  async addRoleToUser(
    @Param('userUUID') userUUID: string,
    @Param('roleUUID') roleUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.userService.addUserRole(userUUID, roleUUID);
  }

  @Delete('/:userUUID/role/:roleUUID')
  @RequireAction(ActionsEnum.UPDATE_USER)
  async deleteRoleFromUser(
    @Param('userUUID') userUUID: string,
    @Param('roleUUID') roleUUID: string,
  ): Promise<ResponseMessageDto> {
    return await this.userService.removeUserRole(userUUID, roleUUID);
  }
}