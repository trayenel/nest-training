import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDataDto, UserResponseDto } from '@nest-training/shared';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

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
}
