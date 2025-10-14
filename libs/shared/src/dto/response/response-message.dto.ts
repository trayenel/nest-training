import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResponseMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  statusCode: number;
}