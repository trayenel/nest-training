import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { UserRoleEntity } from '../../typeorm/entities/user-role.entity';
import { RoleEntity } from '../../typeorm/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LoginDataDto,
  RpcErrorResponseDto,
  UserRequestDto,
  UserResponseDto,
} from '@nest-training/shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users: UserEntity[] = await this.usersRepository.find({
      relations: ['roles'],
    });

    if (!users || users.length === 0) {
      throw new NotFoundException();
    }

    return users;
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: {
        userUUID: id,
      },
      relations: ['roles', 'roles.actions'],
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user as UserResponseDto;
  }

  async getUserByName(username: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOneBy({
      username: username,
    });

    if (!user) {
      const errorObject: RpcErrorResponseDto = {
        message: `User ${username} not found`,
        error: 'Not found',
        statusCode: 404,
      };

      throw new RpcException(errorObject);
    }

    return user;
  }

  async createUser(user: LoginDataDto): Promise<UserResponseDto> {
    const userEntity: UserEntity = this.usersRepository.create(user);

    return await this.usersRepository.save(userEntity);
  }

  async deleteUserById(id: string): Promise<void> {
    const result: DeleteResult = await this.usersRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException(`User with ID ${id} not found`);
  }

  async updateUser(
    id: string,
    modifiedUser: UserRequestDto,
  ): Promise<UserResponseDto> {
    const userEntity: UserEntity | null = await this.usersRepository.findOneBy({
      userUUID: id,
    });

    if (!userEntity)
      throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser: UserEntity = this.usersRepository.merge(
      userEntity,
      modifiedUser,
    );
    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async patchUser(
    id: string,
    partialUser: Partial<UserRequestDto>,
  ): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOneBy({
      userUUID: id,
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser: UserEntity = this.usersRepository.merge(
      user,
      partialUser,
    );
    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async addUserRole(userId: string, roleId: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: { userUUID: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${roleId} not found`);
    }

    user.roles.forEach((role: RoleEntity) => {
      if (role.roleUUID === roleId) {
        throw new NotFoundException(
          `User ${user.username} already has ${role.name} role`,
        );
      }
    });

    const userRole: UserRoleEntity = this.userRoleRepository.create({
      userId: userId,
      roleId: roleId,
    });

    await this.userRoleRepository.save(userRole);

    return user;
  }

  async removeUserRole(
    userId: string,
    roleId: string,
  ): Promise<{ message: string }> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: { userUUID: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID $ {userId} not found`);
    }

    for (const role of user.roles) {
      if (role.roleUUID === roleId) {
        await this.userRoleRepository.delete({
          userId: userId,
          roleId: roleId,
        });
        return {
          message: `Role ${role.name} removed from user ${user.username}`,
        };
      }
    }

    throw new NotFoundException(
      `Role with id ${roleId} not found on user ${user.username}`,
    );
  }
}
