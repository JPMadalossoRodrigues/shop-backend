import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env para process.env
dotenv.config({ path: '.env.development.local' });

export const getOrmConfig = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  migrationsTableName: 'migrations',
});
