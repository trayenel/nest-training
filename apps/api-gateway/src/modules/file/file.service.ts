import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { RpcErrorResponseDto } from '@nest-training/shared';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_SERVICE') private readonly fileClient: ClientProxy,
  ) {}

  uploadPhoto(file: Express.Multer.File, userUUID: string) {
    const pattern = { cmd: 'uploadPhoto' };

    return this.fileClient.send(pattern, { file, userUUID }).pipe(
      catchError((err: RpcErrorResponseDto) => {
        throw new RpcException(err);
      }),
    );
  }
}
