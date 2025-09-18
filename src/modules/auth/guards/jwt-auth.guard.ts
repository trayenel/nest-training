import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../../../shared/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic: boolean | undefined = this.reflector.getAllAndOverride(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err) {
      console.log('///////////// JwtAuthGuard errors: /////////////');
      console.error(err);

      console.log('///////////// JwtAuthGuard user: /////////////');
      console.log(user);

      console.log('///////////// JwtAuthGuard info: /////////////');
      console.log(info);
    }

    // If there's an error or no user, throw an exception
    if (err || !user) {
      console.log('Authentication failed');
      throw err || new UnauthorizedException('Invalid or expired token');
    }

    return user;
  }
}
