import { UserService } from './user.service';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserRequestDto } from './dto/userRequest.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<UserResponseDto[]>;
    getUserById(userUUID: string): Promise<UserResponseDto>;
    getUserByUsername(userName: string): Promise<UserResponseDto>;
    deleteUser(userUUID: string): Promise<void>;
    createUser(user: UserRequestDto): Promise<UserRequestDto>;
    addRoleToUser(userUUID: string, roleUUID: string): Promise<UserResponseDto>;
    updateUser(userUUID: string, user: UserRequestDto): Promise<UserResponseDto>;
    patchUser(userUUID: string, user: UserRequestDto): Promise<UserResponseDto>;
    deleteRole(userUUID: string, roleUUID: string): Promise<{
        message: string;
    }>;
}
