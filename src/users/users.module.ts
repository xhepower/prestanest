import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

import { RutasController } from 'src/rutas/rutas.controller';
import { RutasService } from 'src/rutas/rutas.service';
import { Ruta } from 'src/rutas/entities/ruta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ruta])],
  controllers: [UsersController, RutasController],
  providers: [UsersService, RutasService],
})
export class UsersModule {}
