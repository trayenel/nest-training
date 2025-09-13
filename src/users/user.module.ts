import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthGuard } from '../common/guards/auth.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UsersModule {}
