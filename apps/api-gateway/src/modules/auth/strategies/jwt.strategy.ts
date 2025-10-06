import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import {
  ActionDto,
  JwtPayloadDto,
  RoleDto,
  UserResponseDto,
} from '@nest-training/shared';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
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

  async validate(payload: JwtPayloadDto): Promise<UserResponseDto | null> {
    const user: UserResponseDto | null = await this.usersService.getUserByName(
      payload.username,
    );

    if (!user) {
      return null;
    }

    const actions: ActionDto[] | undefined = user.roles?.flatMap(
      (role: RoleDto): ActionDto[] =>
        role.actions?.map((action: ActionDto): ActionDto => action) || [],
    );

    return {
      username: payload.username,
      roles: user.roles,
      actions: actions,
      userUUID: payload.sub,
    };
  }
}
