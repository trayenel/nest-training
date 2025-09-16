import { UserService } from './user.service.js';
import type { UserRequestDto } from './dto/userRequest.dto.js';
import { UserResponseDto } from './dto/userResponse.dto.js';
import { ActionsEnum } from '../../shared/models/enums/actions.enum.js';
import { RequireAction } from '../../shared/decorators/actions.decorator.js';
import { RoleGuard } from '../auth/guards/role.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.READ_USER)
  @Get('/')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.READ_USER)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.DELETE_USER)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUserById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.CREATE_USER)
  @Post('/')
  async createUser(@Body() user: UserRequestDto): Promise<UserRequestDto> {
    return await this.userService.createUser(user);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.UPDATE_USER)
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(id, user);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.UPDATE_USER)
  @Patch('/:id')
  async patchUser(
    @Param('id') id: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.patchUser(id, user);
  }
}
