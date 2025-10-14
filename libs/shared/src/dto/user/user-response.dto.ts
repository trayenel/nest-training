import { RoleDto } from '../role/role.dto';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ActionDto } from "../action/action.dto";
import { ActionsEnum } from "../../models/enums/actions.enum";

export class UserResponseDto {
  @IsOptional()
  @IsUUID()
  userUUID?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsArray()
  roles?: RoleDto[];

  @IsOptional()
  @IsArray()
  actions?: ActionDto[];
}
