import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource: DataSourceOptions = {
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // TS files
  migrations: ['src/database/migrations/*.ts'],
  // migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  // logging: true,
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;
