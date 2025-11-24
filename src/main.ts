import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { parseCorsWhitelist } from './common/utils/parse-cors-whitelist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  const corsWhiteList = parseCorsWhitelist(process.env.CORS_WHITELIST ?? '');

  app.enableCors({
    origin: (
      origin: string | undefined, //Browser info to protect clients
      callback: (...args: any[]) => void,
    ) => {
      //Requests without origin or from a known origin within corsWhiteList are accepted
      if (!origin || corsWhiteList.includes(origin)) {
        return callback(null, true);
      }
      //Requests with origin, mas not known by server are denied
      return callback(new Error('Not allowed by CORS'), false);
    },
  });

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

  await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
