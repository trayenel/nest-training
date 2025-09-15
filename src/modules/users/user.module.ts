import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { userProviders } from '../../typeorm/providers/user.providers.js';
import { DatabaseModule } from '../../typeorm/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UsersModule {}
