import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { PrestamosService } from 'src/prestamos/prestamos.service';
import { PagosService } from 'src/pagos/pagos.service';

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
    return {
      prestamos,
      pagos,
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
