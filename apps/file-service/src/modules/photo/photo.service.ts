import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PhotoEntity } from '@nest-training/shared';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  async uploadPhoto(
    filePath: string,
    userUUID: string,
  ): Promise<PhotoEntity> {
    const photoEntity: PhotoEntity = this.photoRepository.create({
      filePath: filePath,
      user_id: userUUID,
    });

    return await this.photoRepository.save(photoEntity);
  }
}
