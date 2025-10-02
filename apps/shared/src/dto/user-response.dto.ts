import { RoleDto } from './role.dto';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UserResponseDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  roles?: RoleDto[];
}
