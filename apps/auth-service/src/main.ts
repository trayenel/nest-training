import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
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

  await app.listen();
}
bootstrap();
