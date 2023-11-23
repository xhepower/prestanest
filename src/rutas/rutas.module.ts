import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RutasService } from './rutas.service';
import { RutasController } from './rutas.controller';
import { Ruta } from './entities/ruta.entity';

import { User } from '../users/entities/user.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, Ruta])],
  controllers: [UsersController, RutasController],
  providers: [UsersService, RutasService],
})
export class RutasModule {}
