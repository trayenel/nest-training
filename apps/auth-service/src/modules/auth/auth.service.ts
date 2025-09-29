import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../users/dto/userResponse.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    _password: string,
  ): Promise<UserResponseDto> {
    const user: UserEntity | null = await this.userRepository.findOneBy({
      name: username,
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (user?.password != _password) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }

    const { password, ...results } = user;

    return results;
  }

  login(user: UserResponseDto): any {
    const payload = { sub: user.userId, username: user.name };

    return { access_token: this.jwtService.sign(payload) };
  }
}
