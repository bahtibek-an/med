import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getStaticFilePath } from '../configs/path.config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(getStaticFilePath(), {
    prefix: "/static/"
  });
  app.setGlobalPrefix("/api/v1");

  const config = new DocumentBuilder()
    .setTitle("Med")
    .setDescription("")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup("/", app, document);


  const PORT = process.env.PORT;
  console.log(`Server has been started on PORT ${PORT}`)
  await app.listen(PORT || 3000);
}
bootstrap();
