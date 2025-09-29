import { IsNotEmpty, IsUUID } from 'class-validator';

export class RoleActionDto {
  @IsNotEmpty()
  @IsUUID()
  roleUUID: string;

  @IsNotEmpty()
  @IsUUID()
  actionUUID: string;
}
