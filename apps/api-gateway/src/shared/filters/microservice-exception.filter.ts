import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcErrorResponseDto } from '@nest-training/shared';
import { Response } from 'express';

@Catch(RpcException)
export class MicroserviceExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError() as RpcErrorResponseDto;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(error.statusCode).json(error);
  }
}
