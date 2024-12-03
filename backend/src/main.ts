import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app/app.module';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Cookie Parser

  // Swagger?

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
