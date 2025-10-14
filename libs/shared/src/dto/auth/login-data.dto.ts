import { IsNotEmpty, IsString } from "class-validator";

export class LoginDataDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}