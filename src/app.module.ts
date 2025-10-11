import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { UnitModule } from './unit/unit.module';

@Module({
  // imports: [CatsModule],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8081,
      username: 'postgres',
      password: '12345678',
      database: 'ecogrow',
      entities: ['src/**/*.entity{.ts,.js}'],
      migrations: ['src/migrations/*.ts'],
      synchronize: false,
    }),
    CatsModule,
    ProductsModule,
    CategoryModule,
    BrandModule,
    UnitModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
