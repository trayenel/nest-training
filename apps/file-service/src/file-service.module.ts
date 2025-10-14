import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@nest-training/shared';
import { PhotoModule } from './modules/photo/photo.module';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(process.cwd(), '.env'),
    }),
    DatabaseModule,
    PhotoModule,
  ],
  controllers: [],
  providers: [],
})
export class FileServiceModule {}
