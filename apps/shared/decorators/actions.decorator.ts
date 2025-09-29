import { ActionsEnum } from '../../auth-service/src/shared/models/enums/actions.enum.js';
import { Reflector } from '@nestjs/core';

export const RequireAction = Reflector.createDecorator<ActionsEnum>();
