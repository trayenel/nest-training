import { NestFactory } from '@nestjs/core';
import { FileServiceModule } from './file-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileServiceModule,
    { transport: Transport.TCP, options: { host: '127.0.0.1', port: 3303 } },
  );

  await app.listen();
}
bootstrap();
