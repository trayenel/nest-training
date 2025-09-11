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
import { ActionService } from './action.service';
import type ActionRequestDTO from './dto/ActionRequestDTO';
import { ActionEntity } from './action.entity';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/')
  async getAllActions(): Promise<ActionEntity[]> {
    return await this.actionService.getAllActions();
  }

  @Get('/:id')
  async getActionById(@Param('id') id: string): Promise<ActionEntity> {
    return await this.actionService.getActionById(id);
  }

  @Post('/')
  async createAction(
    @Body() newActionDTO: ActionRequestDTO,
  ): Promise<ActionEntity> {
    return await this.actionService.createAction(newActionDTO);
  }

  @Put('/:id')
  async updateAction(
    @Param('id') id: string,
    @Body() actionDTO: ActionRequestDTO,
  ): Promise<ActionEntity> {
    return await this.actionService.updateAction(id, actionDTO);
  }

  @Patch('/:id')
  async patchAction(
    @Param('id') id: string,
    @Body() action: ActionRequestDTO,
  ): Promise<ActionEntity> {
    return await this.actionService.patchAction(id, action);
  }

  @Delete('/:id')
  async deleteActionById(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.actionService.deleteActionById(id);
  }
}
