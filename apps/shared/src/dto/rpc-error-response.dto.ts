import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RpcErrorResponseDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  error: string;

  @IsNotEmpty()
  @IsNumber()
  statusCode: number;
}