import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../typeorm/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from '../../typeorm/providers/user.providers';
import { userRoleProviders } from '../../typeorm/providers/userRole.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, ...userRoleProviders],
})
export class UsersModule {}
