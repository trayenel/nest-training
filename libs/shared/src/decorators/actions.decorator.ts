import { ActionsEnum } from '../models/enums/actions.enum';
import { Reflector } from '@nestjs/core';

export const RequireAction = Reflector.createDecorator<ActionsEnum>();
