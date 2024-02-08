import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { PrestamosService } from 'src/prestamos/prestamos.service';

@Injectable()
export class ReportesService {
  constructor(private prestamoService: PrestamosService) {}
  create(createReporteDto: CreateReporteDto) {
    return this.prestamoService.findAll({
      minDate: createReporteDto.inicio,
      maxDate: createReporteDto.final,
      limit: 10,
      offset: 0,
    });
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
