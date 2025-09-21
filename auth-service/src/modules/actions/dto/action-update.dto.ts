import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class ActionUpdateDTO {
  @IsOptional()
  @IsUUID()
  actionUUID?: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  description?: string;
}
