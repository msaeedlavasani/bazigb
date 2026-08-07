import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Allow the Next.js web app (dev server on :3000) to call this API.
  app.enableCors({
    origin: true,
    credentials: false,
  });

  await app.listen(3001);
  console.log(`BaziGB Server is running on: http://localhost:3001`);
}
bootstrap();
