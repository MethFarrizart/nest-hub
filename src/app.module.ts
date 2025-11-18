import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleWare } from './common/middleware/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
// import { AppDataSource } from './database/typeorm.config';
// import { APP_GUARD } from '@nestjs/core';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes process.env available everywhere
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        // entities: ['dist/**/*.entity.ts'],
        entities: [User],
        migrations: ['dist/database/migrations/*.ts'],
        synchronize: false,
      }),
    }),
    CatsModule,
    ProductsModule,
    CategoryModule,
    BrandModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // }
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
