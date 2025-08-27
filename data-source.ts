// data-source.ts

import { getOrmConfig } from './orm-config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(getOrmConfig());
