import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ActionsEnum } from '../../../shared/models/enums/actions.enum.js';
import { RequireAction } from '../../../shared/decorators/actions.decorator.js';
import { UserService } from '../../users/user.service.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAction: ActionsEnum = this.reflector.get<ActionsEnum>(
      RequireAction,
      context.getHandler(),
    );

    if (!requiredAction) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    return user.actions.includes(requiredAction);
  }
}
