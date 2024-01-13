import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      // 👈 add config
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    TypeORM: {
      TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
      // TYPEORM_HOST : localhost
      // TYPEORM_USERNAME : xhepo
      // TYPEORM_PASSWORD : xhepower
      // TYPEORM_DATABASE : my_db
      // TYPEORM_PORT : 5435
      // TYPEORM_SYNCHRONIZE = false
      // TYPEORM_LOGGING = true
      // TYPEORM_ENTITIES = src/**/*.entity.ts
      // TYPEORM_MIGRATIONS = src/database/migrations/*.ts
      // TYPEORM_MIGRATIONS_DIR = src/database/migrations
      // TYPEORM_MIGRATIONS_TABLE_NAME = migrations
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWTSECRET,
  };
});
