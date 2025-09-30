import { IsNotEmpty, IsString } from "class-validator";

export class LoginDataDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}