import { Module } from '@nestjs/common';
import { ActionController } from '../Controllers/action.controller';
import { ActionService } from '../Services/action.service';

@Module({
  imports: [],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
