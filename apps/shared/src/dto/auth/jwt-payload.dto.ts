import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleDto } from "../role/role.dto";

export class JwtPayloadDto {
  @IsNotEmpty()
  @IsString()
  sub: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}