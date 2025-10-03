import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceExceptionFilter } from './shared/filters/microservice-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MicroserviceExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
