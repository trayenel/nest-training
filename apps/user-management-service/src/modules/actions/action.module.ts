import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionEntity } from '@nest-training/shared';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity])],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
