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

  // CORS: allow a comma-separated ALLOWED_ORIGINS list in production
  // (e.g. "https://bazigb.example.com"). Falls back to `origin: true`
  // (reflect any origin) for local development.
  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: false,
  });

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);
  console.log(`BaziGB Server is running on: http://localhost:${port}`);
}
bootstrap();
