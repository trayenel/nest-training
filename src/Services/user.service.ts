import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../Entities/user.entity';
import { UserRequestDTO } from '../DTO/UserRequestDTO';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async createUser(user: UserRequestDTO): Promise<UserEntity> {
    const userEntity: UserEntity = this.usersRepository.create(user);

    return await this.usersRepository.save(userEntity);
  }

  async deleteUserById(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException(`User with ID ${id} not found`);
  }

  async updateUser(
    id: string,
    modifiedUser: UserRequestDTO,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.getUserById(id);
    const updatedUser: UserEntity = this.usersRepository.merge(
      user,
      modifiedUser,
    );

    return await this.usersRepository.save(updatedUser);
  }

  async patchUser(
    id: string,
    partialUser: Partial<UserRequestDTO>,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.getUserById(id);
    const updatedUser: UserEntity = this.usersRepository.merge(
      user,
      partialUser,
    );

    return await this.usersRepository.save(updatedUser);
  }
}
