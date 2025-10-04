import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // auto-load all entities
      synchronize: false,
    }),
    CatsModule,
    ProductsModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
