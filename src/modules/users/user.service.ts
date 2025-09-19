import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity.js';
import { UserRequestDto } from './dto/userRequest.dto.js';
import { UserResponseDto } from './dto/userResponse.dto.js';
import { RoleActionDto } from '../roles/dto/roleAction.dto';
import { RoleEntity } from '../../typeorm/entities/role.entity';
import { ActionEntity } from '../../typeorm/entities/action.entity';
import { RoleActionEntity } from '../../typeorm/entities/roleAction.entity';
import { UserRoleEntity } from '../../typeorm/entities/userRole.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<UserEntity>,
    @Inject('USER_ROLE_REPOSITORY')
    private readonly userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users: UserEntity[] = await this.usersRepository.find({
      relations: ['roles'],
    });

    if (!users || users.length === 0) {
      throw new NotFoundException();
    }

    return users.map(({ password, ...rest }: UserEntity): UserResponseDto => {
      return rest as UserResponseDto;
    });
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: {
        userId: id,
      },
      relations: ['roles', 'roles.actions'],
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    const { password, ...results } = user;

    return results;
  }

  async getUserByName(name: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOneBy({
      name: name,
    });

    if (!user) throw new NotFoundException(`User ${name} not found`);

    const { password, ...results } = user;

    return results;
  }

  async createUser(user: UserRequestDto): Promise<UserResponseDto> {
    const userEntity: UserEntity = this.usersRepository.create(user);

    const savedUser: UserEntity = await this.usersRepository.save(userEntity);

    return savedUser as UserResponseDto;
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
      userId: id,
    });

    if (!userEntity)
      throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser: UserEntity = this.usersRepository.merge(
      userEntity,
      modifiedUser,
    );
    await this.usersRepository.save(updatedUser);

    const { password, ...results } = updatedUser;

    return results;
  }

  async patchUser(
    id: string,
    partialUser: Partial<UserRequestDto>,
  ): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOneBy({
      userId: id,
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser: UserEntity = this.usersRepository.merge(
      user,
      partialUser,
    );
    await this.usersRepository.save(updatedUser);

    const { password, ...results } = updatedUser;

    return results;
  }

  async addUserRole(userId: string, roleId: string): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: { userId: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${roleId} not found`);
    }

    user.roles.forEach((role: RoleEntity) => {
      if (role.roleId === roleId) {
        throw new NotFoundException(
          `User ${user.name} already has ${role.name} role`,
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
      where: { userId: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID $ {userId} not found`);
    }

    for (const role of user.roles) {
      if (role.roleId === roleId) {
        await this.userRoleRepository.delete({
          userId: userId,
          roleId: roleId,
        });
        return {
          message: `Role ${role.name} removed from user ${user.name}`,
        };
      }
    }

    throw new NotFoundException(
      `Role with id ${roleId} not found on user ${user.name}`,
    );
  }
}
