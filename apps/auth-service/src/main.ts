import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const envPath = resolve(__dirname, '../.env.auth-service');

  dotenv.config({ path: envPath });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3301,
      },
    },
  );

  // const config = new DocumentBuilder()
  //   .setTitle('My awesome NestJs learning App')
  //   .setDescription(`Learning app providing user and roles management`)
  //   .setVersion('1.0')
  //   .build();

  // const documentFactory = () => SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  const jwtAuthGuard = new JwtAuthGuard(reflector);
  const roleGuard = new RoleGuard(reflector);

  app.useGlobalGuards(jwtAuthGuard, roleGuard);

  await app.listen();
}
bootstrap();
