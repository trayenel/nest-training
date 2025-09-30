import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  // Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ActionUpdateDTO } from '@nest-training/shared';
import { ActionService } from './action.service';
import { ActionDto } from '@nest-training/shared';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/')
  async getAllActions(): Promise<ActionDto[]> {
    return await this.actionService.getAllActions();
  }

  @Get('/:id')
  async getActionById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ActionDto> {
    return await this.actionService.getActionById(id);
  }

  @Post('/')
  async createAction(@Body() newAction: ActionDto): Promise<ActionDto> {
    return await this.actionService.createAction(newAction);
  }

  @Put('/:id')
  async updateAction(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() actionDTO: ActionUpdateDTO,
  ): Promise<ActionDto> {
    return await this.actionService.updateAction(id, actionDTO);
  }

  @Patch('/:id')
  async patchAction(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() actionDTO: ActionUpdateDTO,
  ): Promise<ActionDto> {
    return await this.actionService.patchAction(id, actionDTO);
  }

  @Delete('/:id')
  async deleteActionById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return await this.actionService.deleteActionById(id);
  }
}
