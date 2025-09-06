import { Module } from '@nestjs/common';
import { UserService } from '../Services/user.service';
import { UserController } from '../Controllers/user.controller';
import { userProviders } from '../Providers/user.providers';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UsersModule {}
