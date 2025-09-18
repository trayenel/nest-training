import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
