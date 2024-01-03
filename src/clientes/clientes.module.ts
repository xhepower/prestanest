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
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { PrestamosService } from 'src/prestamos/prestamos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Ruta, User, Prestamo])],
  controllers: [ClientesController, RutasController],
  providers: [ClientesService, RutasService, UsersService, PrestamosService],
})
export class ClientesModule {}
