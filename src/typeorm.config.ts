import { DataSource } from 'typeorm';
import { Product } from './products/entities/products.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or mysql
  host: 'localhost',
  port: 8081,
  username: 'postgres',
  password: '12345678',
  database: 'ecogrow',
  entities: [Product],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
