import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Prestamo } from './entities/prestamo.entity';
import { ClientesController } from 'src/clientes/clientes.controller';
import { ClientesService } from 'src/clientes/clientes.service';
import { RutasService } from 'src/rutas/rutas.service';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { RutasController } from 'src/rutas/rutas.controller';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Prestamo, Ruta, User])],
  controllers: [PrestamosController, ClientesController, RutasController],
  providers: [PrestamosService, ClientesService, RutasService, UsersService],
})
export class PrestamosModule {}
