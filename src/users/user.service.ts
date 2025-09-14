import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserRequestDTO } from './dto/UserRequestDTO';
import { UserResponseDTO } from './dto/UserResponseDTO';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users: UserEntity[] = await this.usersRepository.find();

    if (!users || users.length === 0) {
      throw new NotFoundException();
    }

    return users.map(({ password, ...rest }: UserEntity): UserResponseDTO => {
      return rest as UserResponseDTO;
    });
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user: UserEntity | null = await this.usersRepository.findOne({
      where: {
        userId: id,
      },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    const { password, ...results } = user;

    return results;
  }

  async getUserByName(name: string): Promise<UserResponseDTO> {
    const user: UserEntity | null = await this.usersRepository.findOneBy({
      name: name,
    });

    if (!user) throw new NotFoundException(`User ${name} not found`);

    const { password, ...results } = user;

    return results;
  }

  async createUser(user: UserRequestDTO): Promise<UserResponseDTO> {
    const userEntity: UserEntity = this.usersRepository.create(user);

    const savedUser: UserEntity = await this.usersRepository.save(userEntity);

    return savedUser as UserResponseDTO;
  }

  async deleteUserById(id: string): Promise<void> {
    const result: DeleteResult = await this.usersRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException(`User with ID ${id} not found`);
  }

  async updateUser(
    id: string,
    modifiedUser: UserRequestDTO,
  ): Promise<UserResponseDTO> {
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
    partialUser: Partial<UserRequestDTO>,
  ): Promise<UserResponseDTO> {
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
}
