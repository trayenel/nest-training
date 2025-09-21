import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class ActionDto {
  @IsNotEmpty()
  @IsUUID()
  actionUUID: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  description?: string;
}
