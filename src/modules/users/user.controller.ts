import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import type { UserRequestDTO } from './dto/UserRequestDTO.js';
import { UserResponseDTO } from './dto/UserResponseDTO.js';
import { ActionsEnum } from '../../shared/models/enums/actions.enum.js';
import { RequireAction } from '../../shared/decorators/actions.decorator.js';
import { RoleGuard } from '../auth/guards/role.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireAction(ActionsEnum.READ_USER)
  @Get('/')
  async getAllUsers(): Promise<UserResponseDTO[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDTO> {
    return await this.userService.getUserById(id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUserById(id);
  }

  @Post('/')
  async createUser(@Body() user: UserRequestDTO): Promise<UserRequestDTO> {
    return await this.userService.createUser(user);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UserRequestDTO,
  ): Promise<UserResponseDTO> {
    return await this.userService.updateUser(id, user);
  }

  @Patch('/:id')
  async patchUser(
    @Param('id') id: string,
    @Body() user: UserRequestDTO,
  ): Promise<UserResponseDTO> {
    return await this.userService.patchUser(id, user);
  }
}
