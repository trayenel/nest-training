import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { UserRoleEntity } from '../../typeorm/entities/user-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRoleEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
