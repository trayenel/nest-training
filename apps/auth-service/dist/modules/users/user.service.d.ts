import { Repository } from 'typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { UserRoleEntity } from '../../typeorm/entities/userRole.entity';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserRequestDto } from './dto/userRequest.dto';
export declare class UserService {
    private readonly usersRepository;
    private readonly userRoleRepository;
    constructor(usersRepository: Repository<UserEntity>, userRoleRepository: Repository<UserRoleEntity>);
    getAllUsers(): Promise<UserResponseDto[]>;
    getUserById(id: string): Promise<UserResponseDto>;
    getUserByName(name: string): Promise<UserResponseDto>;
    createUser(user: UserRequestDto): Promise<UserResponseDto>;
    deleteUserById(id: string): Promise<void>;
    updateUser(id: string, modifiedUser: UserRequestDto): Promise<UserResponseDto>;
    patchUser(id: string, partialUser: Partial<UserRequestDto>): Promise<UserResponseDto>;
    addUserRole(userId: string, roleId: string): Promise<UserResponseDto>;
    removeUserRole(userId: string, roleId: string): Promise<{
        message: string;
    }>;
}
