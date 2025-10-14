import { Controller, UploadedFile } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PhotoService } from './photo.service';

@Controller()
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @MessagePattern({ cmd: 'uploadPhoto' })
  async uploadPhoto(
    @Payload()
    @UploadedFile()
    data: {
      file: Express.Multer.File;
      userUUID: string;
    },
  ): Promise<any> {
    return await this.photoService.uploadPhoto(data.file, data.userUUID);
  }
}
