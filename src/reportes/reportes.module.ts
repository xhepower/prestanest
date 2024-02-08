import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamosService } from 'src/prestamos/prestamos.service';
import { PrestamosController } from 'src/prestamos/prestamos.controller';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { ClientesController } from 'src/clientes/clientes.controller';
import { ClientesService } from 'src/clientes/clientes.service';
import { RutasService } from 'src/rutas/rutas.service';
import { Ruta } from 'src/rutas/entities/ruta.entity';
import { RutasController } from 'src/rutas/rutas.controller';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Pago } from 'src/pagos/entities/pago.entity';
import { PagosController } from 'src/pagos/pagos.controller';
import { PagosService } from 'src/pagos/pagos.service';
@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Prestamo, Ruta, User, Pago])],
  controllers: [
    PrestamosController,
    ClientesController,
    RutasController,
    ReportesController,
    PagosController,
  ],
  providers: [
    PrestamosService,
    ClientesService,
    RutasService,
    UsersService,
    ReportesService,
    PagosService,
  ],
})
export class ReportesModule {}
