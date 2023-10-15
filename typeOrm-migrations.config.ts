import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { CrudEntity } from './src/crud/entities/crud.entity';
import { User } from './src/user/entities/user.entity';
const env = process.env.NODE_ENV || 'development';
config({ path: `./.env.${env}` });

export default new DataSource({
  type: 'mysql',
  host: `${process.env.DB_HOST}`,
  port: Number(process.env.DB_PORT),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  synchronize: false,
  entities: [CrudEntity, User],
  migrationsRun: true,
  migrations: [
    './src/db/typeorm-migrations/*.ts',
    './src/db/typeorm-migrations/*.js',
  ],
});
