import { Repository } from 'typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../users/dto/userResponse.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    validateUser(username: string, _password: string): Promise<UserResponseDto>;
    login(user: UserResponseDto): any;
}
