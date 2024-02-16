import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { PrestamosService } from 'src/prestamos/prestamos.service';
import { PagosService } from 'src/pagos/pagos.service';
import { pagoInterface } from 'src/prestamos/prestamos.controller';

@Injectable()
export class ReportesService {
  constructor(
    private prestamoService: PrestamosService,
    private pagoService: PagosService,
  ) {}
  async create(createReporteDto: CreateReporteDto) {
    const prestamos = await this.prestamoService.findAll({
      minDate: createReporteDto.inicio,
      maxDate: createReporteDto.final,
      limit: 0,
      offset: 0,
    });
    const pagos = await this.pagoService.findAll({
      minDate: createReporteDto.inicio,
      maxDate: createReporteDto.final,
      limit: 0,
      offset: 0,
    });
    interface prestamoInt {
      capital: number;
    }
    interface pagoInt {
      monto: number;
    }
    const sumaPrestamos: number = prestamos.reduce(
      (acumulador: number, objeto: prestamoInt) => {
        return acumulador + Number(objeto.capital);
      },
      0,
    );
    const sumaPagos: number = pagos.reduce(
      (acumulador: number, objeto: pagoInt) => {
        return acumulador + Number(objeto.monto);
      },
      0,
    );
    console.log(sumaPrestamos);
    return {
      prestamos,
      pagos,
      sumaPrestamos,
      sumaPagos,
    };
  }

  findAll() {
    return `This action returns all reportes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reporte`;
  }

  update(id: number, updateReporteDto: UpdateReporteDto) {
    return `This action updates a #${id} reporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporte`;
  }
}
