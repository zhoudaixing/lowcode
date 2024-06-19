import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

// import { TransformInterceptor } from './common/interceptors/transform.interceptors';
import {
  TransformInterceptor,
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '@app/comm';

import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // Version Control
  app.enableVersioning({
    type: VersioningType.URI,
  });

  generateDocument(app);

  await app.listen(3000);
}
bootstrap();
