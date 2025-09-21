import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from './modules/auth/guards/role.guard';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
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
