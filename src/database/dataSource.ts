import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();
export const connectionSource = new DataSource({
  type: 'postgres',
  username: configService.get(' TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  port: configService.get('TYPEORM_PORT'),
  host: configService.get('TYPEORM_HOST'),
  synchronize: false,
  logging: true,
  entities: ['src/*/*/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
