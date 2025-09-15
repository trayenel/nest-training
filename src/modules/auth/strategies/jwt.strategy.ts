import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../typeorm/entities/user.entity.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
  ) {
    const secret: string | undefined = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('Missing JWT secret');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any): Promise<any> {
    const user: UserEntity | null = await this.userRepository.findOne({
      where: { userId: payload.sub },
      relations: ['roles', 'roles.actions'],
    });

    if (!user) {
      return null;
    }

    const actions: string[] | undefined = user.roles?.flatMap(
      (role) => role.actions?.map((action) => action.name) || [],
    );

    return {
      userId: payload.sub,
      role: user.roles,
      actions: actions,
    };
  }
}
