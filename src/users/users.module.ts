import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

import { RutasController } from 'src/rutas/rutas.controller';
import { RutasService } from 'src/rutas/rutas.service';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ruta])],
  controllers: [UsersController, RutasController, AuthController],
  providers: [UsersService, RutasService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
