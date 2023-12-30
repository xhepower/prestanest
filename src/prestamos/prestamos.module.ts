import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from './entities/prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PrestamosController],
  providers: [PrestamosService],
  imports: [TypeOrmModule.forFeature([Prestamo])],
})
export class PrestamosModule {}
