import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //whitelist: true will remove any non-decorated values received in request body
  //forbidNonWhitelisted: true will return a 400 bad response if non-decorated values are received in request body
  //transform: true will convert request body into the appropriate dto object instance
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
