import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RutasModule } from './rutas/rutas.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
const API_KEY = '1324567890';
@Module({
  imports: [
    UsersModule,
    RutasModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
})
export class AppModule {}
