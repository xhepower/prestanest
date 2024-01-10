import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { Ruta } from '../rutas/entities/ruta.entity';
import { User } from '../users/entities/user.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Prestamo } from '../prestamos/entities/prestamo.entity';
import { Pago } from './entities/pago.entity';
import { UsersService } from '../users/users.service';
import { RutasService } from '../rutas/rutas.service';
import { ClientesService } from '../clientes/clientes.service';
import { PrestamosService } from '../prestamos/prestamos.service';
import { PrestamosController } from '../prestamos/prestamos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ruta, Cliente, Prestamo, Pago])],
  controllers: [PagosController, PrestamosController],
  providers: [
    UsersService,
    RutasService,
    ClientesService,
    PrestamosService,
    PagosService,
  ],
})
export class PagosModule {}
