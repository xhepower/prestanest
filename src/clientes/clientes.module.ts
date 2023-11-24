import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { RutasController } from 'src/rutas/rutas.controller';
import { RutasService } from 'src/rutas/rutas.service';
import { Cliente } from './entities/cliente.entity';
import { Ruta } from '../rutas/entities/ruta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Ruta, User])],
  controllers: [ClientesController, RutasController],
  providers: [ClientesService, RutasService, UsersService],
})
export class ClientesModule {}
