import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'ecogrow',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/database/migrations/**/*{.ts,.js}'],
  // migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  // logging: true,
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;
