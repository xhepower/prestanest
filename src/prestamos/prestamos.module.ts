import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from './entities/prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plazo } from '../plazos/entities/plazo.entity';

@Module({
  controllers: [PrestamosController],
  providers: [PrestamosService],
  imports: [TypeOrmModule.forFeature([Prestamo, Plazo])],
})
export class PrestamosModule {}
