import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ActionsEnum,
  RequireAction,
  UserResponseDto,
} from '@nest-training/shared';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAction: ActionsEnum = this.reflector.get<ActionsEnum>(
      RequireAction,
      context.getHandler(),
    );

    const request: Request = context.switchToHttp().getRequest();
    const user: UserResponseDto | undefined = request.user;

    if (!requiredAction || user?.userUUID === request?.params?.userUUID) {
      return true;
    }

    if (!user || !user.actions) {
      return false;
    }

    for (const action of user.actions) {
      if ((action.name as ActionsEnum) === requiredAction) {
        return true;
      }
    }

    return false;
  }
}
