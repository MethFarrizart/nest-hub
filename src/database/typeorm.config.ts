import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/entities/user.entity';
import { Product } from 'src/modules/products/entities/products.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';

dotenv.config();

export const AppDataSource: DataSourceOptions = {
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product, Brand, Category], // TS files
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // turn of for production
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;
