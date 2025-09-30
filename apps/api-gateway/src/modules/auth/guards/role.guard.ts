import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ActionsEnum, RequireAction } from '@nest-training/shared';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAction: ActionsEnum = this.reflector.get<ActionsEnum>(
      RequireAction,
      context.getHandler(),
    );

    if (!requiredAction) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user.actions.includes(requiredAction);
  }
}
