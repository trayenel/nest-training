import { UserService } from './user.service.js';
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
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserRequestDto } from './dto/userRequest.dto';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RequireAction(ActionsEnum.READ_USER)
  @Get('/')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.getAllUsers();
  }

  @RequireAction(ActionsEnum.READ_USER)
  @Get('/:uuid')
  async getUserById(@Param('uuid') uuid: string): Promise<UserResponseDto> {
    return await this.userService.getUserById(uuid);
  }

  @RequireAction(ActionsEnum.DELETE_USER)
  @Delete('/:uuid')
  async deleteUser(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<void> {
    return await this.userService.deleteUserById(uuid);
  }

  @RequireAction(ActionsEnum.CREATE_USER)
  @Post('/')
  async createUser(@Body() user: UserRequestDto): Promise<UserRequestDto> {
    return await this.userService.createUser(user);
  }

  @RequireAction(ActionsEnum.UPDATE_USER)
  @Put('/:uuid')
  async updateUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(uuid, user);
  }

  @RequireAction(ActionsEnum.UPDATE_USER)
  @Patch('/:uuid')
  async patchUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() user: UserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.patchUser(uuid, user);
  }
}
