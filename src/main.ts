import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Evita que entren más datos de los que espero
      transform: true, // Convierte los parámetros al tipo especificado en el codigo
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('To Do App')
    .setDescription('The To Do API description')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth() // Añade el botón Authorize a Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
