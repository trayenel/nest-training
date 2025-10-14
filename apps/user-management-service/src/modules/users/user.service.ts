import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LoginDataDto,
  ResponseMessageDto,
  RoleEntity,
  RpcErrorResponseDto,
  UserEntity,
  UserRequestDto,
  UserResponseDto,
  UserRoleEntity,
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
      const errorObject: RpcErrorResponseDto = {
        message: 'No users found',
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(errorObject);
    }

    return users;
  }

  async getUserByUUID(uuid: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: {
        userUUID: uuid,
      },
      relations: ['roles', 'roles.actions'],
    });

    if (!user) {
      const errorObject: RpcErrorResponseDto = {
        message: `User with ID ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(errorObject);
    }

    return user as UserResponseDto;
  }

  async getUserByName(username: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: {
        username: username,
      },
      relations: ['roles', 'roles.actions'],
    });

    if (!user) {
      const errorObject: RpcErrorResponseDto = {
        message: `User ${username} not found`,
        error: 'Not Found',
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

  async deleteUserByUUID(uuid: string): Promise<ResponseMessageDto> {
    const result: DeleteResult = await this.usersRepository.delete({
      userUUID: uuid,
    });
    if (!result.affected) {
      const errorObject: RpcErrorResponseDto = {
        message: `User with ID ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(errorObject);
    }

    return {
      message: `User with UUID ${uuid} deleted successfully`,
      statusCode: 200,
    };
  }

  async updateUser(
    uuid: string,
    modifiedUser: UserRequestDto,
  ): Promise<UserResponseDto> {
    const userEntity: UserEntity | null = await this.usersRepository.findOneBy({
      userUUID: uuid,
    });

    if (!userEntity) {
      const errorObject: RpcErrorResponseDto = {
        message: `User with uuid ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(errorObject);
    }

    const updatedUser: UserEntity = this.usersRepository.merge(
      userEntity,
      modifiedUser,
    );
    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async patchUser(
    uuid: string,
    partialUser: Partial<UserRequestDto>,
  ): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOneBy({
      userUUID: uuid,
    });

    if (!user) {
      const errorObject: RpcErrorResponseDto = {
        message: `User with uuid ${uuid} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(errorObject);
    }

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
      const errorObject: RpcErrorResponseDto = {
        message: `User with id ${userId} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(errorObject);
    }

    user.roles.forEach((role: RoleEntity) => {
      if (role.roleUUID === roleId) {
        const errorObject: RpcErrorResponseDto = {
          message: `User ${user.username} already has ${role.name} role`,
          error: 'Conflict',
          statusCode: 409,
        };
        throw new RpcException(errorObject);
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
  ): Promise<ResponseMessageDto> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: { userUUID: userId },
      relations: ['roles'],
    });

    if (!user) {
      const errorObject: RpcErrorResponseDto = {
        message: `User with ID ${userId} not found`,
        error: 'Not Found',
        statusCode: 404,
      };
      throw new RpcException(errorObject);
    }

    for (const role of user.roles) {
      if (role.roleUUID === roleId) {
        await this.userRoleRepository.delete({
          userId: userId,
          roleId: roleId,
        });
        return {
          message: `Role ${role.name} removed from user ${user.username}`,
          statusCode: 200,
        };
      }
    }

    const errorObject: RpcErrorResponseDto = {
      message: `Role with id ${roleId} not found on user ${user.username}`,
      error: 'Not Found',
      statusCode: 404,
    };
    throw new RpcException(errorObject);
  }

  async getUserByEmail(email: string): Promise<UserResponseDto | null> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }
}
