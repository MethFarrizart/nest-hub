import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // <--- required to override internal logs
    logger: false, // <--- disable Nest default logger
  });

  const logger = WinstonModule.createLogger({
    transports: [
      // DAILY ROTATE ERROR LOG
      new DailyRotateFile({
        dirname: 'logs', // folder
        filename: 'error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        zippedArchive: true, // optional: compress old logs
        maxSize: '20m', // optional
        maxFiles: '14d', // keep 14 days
      }),
    ],
  });

  app.useLogger(logger);

  // secure cors
  app.enableCors({
    origin: ['http://localhost:3000'],
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
