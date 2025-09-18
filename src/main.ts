import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My awesome NestJs learning App')
    .setDescription(`Learning app providing user and roles management`)
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  const jwtAuthGuard = new JwtAuthGuard(reflector);
  const roleGuard = new RoleGuard(reflector);

  app.useGlobalGuards(jwtAuthGuard, roleGuard);

  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
