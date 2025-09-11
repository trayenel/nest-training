import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, _password: string): Promise<any> {
    const user: UserEntity | null = await this.userRepository.findOneBy({
      name: username,
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (user?.password != _password) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: user.id, username: user.name };

    return { access_token: this.jwtService.sign(payload) };
  }
}
