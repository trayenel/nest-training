import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '@nest-training/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

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

    if (!user || user?.password != _password) {
      throw new RpcException({
        message: 'Invalid username or password',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }

    const { password, ...results } = user;

    return results;
  }

  login(user: UserResponseDto): any {
    const payload = { sub: user.userId, username: user.name };

    return { access_token: this.jwtService.sign(payload) };
  }
}
