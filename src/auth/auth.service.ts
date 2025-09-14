import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDTO } from '../users/dto/UserResponseDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    _password: string,
  ): Promise<UserResponseDTO> {
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

  login(user: any): any {
    const payload = { sub: user.id, username: user.name };

    return { access_token: this.jwtService.sign(payload) };
  }
}
