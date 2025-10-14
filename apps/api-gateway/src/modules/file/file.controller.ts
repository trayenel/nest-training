import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  fileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: Request,
  ) {
    return this.fileService.uploadPhoto(file, req['user'].userUUID);
  }
}
