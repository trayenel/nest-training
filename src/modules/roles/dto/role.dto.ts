import { ActionDto } from '../../actions/dto/action.dto.js';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class RoleDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  name: string;

  @IsArray()
  @IsOptional()
  actions?: ActionDto[];
}
