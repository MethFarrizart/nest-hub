import { DataSource } from 'typeorm';
import { Product } from '../products/entities/products.entity';
import { Cat } from '../cats/entities/cat.entity';
import { Category } from '../category/entities/category.entity';
import { Brand } from '../brand/entities/brand.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or mysql
  host: 'localhost',
  port: 8081,
  username: 'postgres',
  password: '12345678',
  database: 'ecogrow',
  entities: [Product, Cat, Category, Brand],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
