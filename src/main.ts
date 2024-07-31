import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getStaticFilePath } from '../configs/path.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(getStaticFilePath(), {
    prefix: "/static/"
  });
  app.setGlobalPrefix("/api/v1");
  const PORT = process.env.PORT;
  await app.listen(PORT || 3000);
}
bootstrap();
