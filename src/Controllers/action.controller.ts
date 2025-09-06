import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ActionService } from '../Services/action.service';
import type ActionDTO from '../DTO/ActionDTO';
import { UserRequestDTO } from '../DTO/UserRequestDTO';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/')
  getAllActions(): Record<string, ActionDTO> {
    return this.actionService.getAllActions();
  }

  @Get('/:id')
  getActionById(@Param('id') id: string): ActionDTO {
    return this.actionService.getActionById(id);
  }

  @Post('/')
  createAction(@Body() newActionDTO: ActionDTO): void {
    return this.actionService.createAction(newActionDTO);
  }

  @Put('/:id')
  updateAction(
    @Param('id') id: string,
    @Body() actionDTO: ActionDTO,
  ): ActionDTO {
    return this.actionService.updateAction(id, actionDTO);
  }

  @Patch('/:id')
  patchAction(@Param('id') id: string, @Body() action: ActionDTO): ActionDTO {
    return this.actionService.patchAction(id, action);
  }

  @Delete('/:id')
  deleteActionById(@Param('id') id: string): void {
    return this.actionService.deleteActionById(id);
  }
}
