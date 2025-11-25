import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
      ],
    }),
  });

  // secure cors
  app.enableCors({
    origin: [process.env.ALLOW_SITE],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Authorization'],
  });

  // protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    }),
  );

  // decrease the size of the response body, thereby increasing the speed of a web app.
  app.use(compression());

  // When the user visits the website again, the cookie is automatically sent with the request.
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe()); //check validation
  app.useGlobalFilters(new AllExceptionsFilter()); // error log

  app.useGlobalInterceptors(
    // new ClassSerializerInterceptor(app.get(Reflector)),
    {
      intercept(context, next) {
        return next.handle();
      },
    },
  ); // use to hide field in dto

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
