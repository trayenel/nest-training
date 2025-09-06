import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from '../Entities/user.entity';
import { UserService } from '../Services/user.service';
import type { UserRequestDTO } from '../DTO/UserRequestDTO';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
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
  ): Promise<UserEntity> {
    return await this.userService.updateUser(id, user);
  }

  @Patch('/:id')
  async patchUser(
    @Param('id') id: string,
    @Body() user: UserRequestDTO,
  ): Promise<UserEntity> {
    return await this.userService.patchUser(id, user);
  }
}
