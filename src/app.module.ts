import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleWare } from './common/middleware/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatsModule } from './modules/cats/cats.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { Product } from './modules/products/entities/products.entity';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlingHandler } from './config/throttle.config';
import { ThrottlerModule } from '@nestjs/throttler';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

// task: implement global route with api/

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes process.env available everywhere
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // type: 'mysql',
        // host: config.get<string>('DB_HOST'),
        // port: config.get<number>('DB_PORT'),
        // username: config.get<string>('DB_USERNAME'),
        // password: config.get<string>('DB_PASSWORD'),
        // database: config.get<string>('DB_NAME'),
        // // entities: ['dist/**/*.entity.ts'],
        // entities: [User, Product],
        // migrations: ['dist/database/migrations/*.ts'],
        // synchronize: false,
        type: 'mysql',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.name'),
        entities: [User, Product],
        migrations: ['dist/database/migrations/*.ts'],
        synchronize: false, // turn off for production
      }),
    }),

    CatsModule,
    ProductsModule,
    CategoryModule,
    BrandModule,
    UserModule,

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>('THROTTLE_TTL'),
        limit: config.get<number>('THROTTLE_LIMIT'),
      }),
    }),

    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        timeout: config.get('HTTP_TIMEOUT'), // would call back data for 5 seconds early
        maxRedirects: config.get('MAX_REDIRECT'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlingHandler,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude('user/register', 'user/login')
      .forRoutes('*');
  }
}
