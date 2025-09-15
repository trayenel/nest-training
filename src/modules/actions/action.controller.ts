import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ActionService } from './action.service.js';
import type ActionDTO from './dto/ActionDTO.js';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/')
  async getAllActions(): Promise<ActionDTO[]> {
    return await this.actionService.getAllActions();
  }

  @Get('/:id')
  async getActionById(@Param('id') id: string): Promise<ActionDTO> {
    return await this.actionService.getActionById(id);
  }

  @Post('/')
  async createAction(@Body() newAction: ActionDTO): Promise<ActionDTO> {
    return await this.actionService.createAction(newAction);
  }

  @Put('/:id')
  async updateAction(
    @Param('id') id: string,
    @Body() actionDTO: ActionDTO,
  ): Promise<ActionDTO> {
    return await this.actionService.updateAction(id, actionDTO);
  }

  // @Patch('/:id')
  // async patchAction(
  //   @Param('id') id: string,
  //   @Body() action: ActionDTO,
  // ): Promise<ActionDTO> {
  //   return await this.actionService.patchAction(id, action);
  // }
  //
  @Delete('/:id')
  async deleteActionById(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.actionService.deleteActionById(id);
  }
}
