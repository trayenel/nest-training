import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

async function bootstrap() {
  const envPath = resolve(__dirname, '../../.env');

  dotenv.config({ path: envPath });

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3302,
    },
  });

  await app.listen();
}
bootstrap();
