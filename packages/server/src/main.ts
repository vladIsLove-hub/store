import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 5050;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console, cors: true });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Book Store Docs')
    .setDescription('Book Store info')
    .setVersion('1.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);
}
bootstrap();
