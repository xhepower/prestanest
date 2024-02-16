import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';
import { PrestamosService } from '../prestamos/prestamos.service';
import { FilterPagosDto } from './dto/filter-pago.dto';
@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago) private pagoRepo: Repository<Pago>,
    private prestamoService: PrestamosService,
  ) {}
  async create(createPagoDto: CreatePagoDto) {
    const newPago = this.pagoRepo.create(createPagoDto);
    if (+createPagoDto.prestamoId) {
      const prestamo = await this.prestamoService.findOne(
        +createPagoDto.prestamoId,
      );
      newPago.prestamo = prestamo;
      newPago.saldoAnterior = prestamo.saldo;
      newPago.saldoActual = prestamo.saldo - newPago.monto;
    }
    const rta = this.pagoRepo.save(newPago);
    await this.prestamoService.disminuirPago(
      createPagoDto.prestamoId,
      createPagoDto.monto,
    );
    return rta;
  }

  findAll(params: FilterPagosDto) {
    const { limit, offset, minDate, maxDate } = params;
    const where: FindOptionsWhere<Pago> = {};
    if (minDate && maxDate) {
      where.created_at = Between(minDate, maxDate);
    }
    return this.pagoRepo.find({
      relations: ['prestamo'],
      where,
      take: limit,
      skip: offset,
      order: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const pago = await this.pagoRepo.findOne({
      where: [{ id }],
      relations: ['prestamo'],
    });
    if (!pago) {
      throw new NotFoundException(`Pago #${id} not found`);
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto) {
    const pago = await this.findOne(id);
    this.pagoRepo.merge(pago, updatePagoDto);
    return this.pagoRepo.save(pago);
  }

  remove(id: number) {
    return this.pagoRepo.delete(id);
  }
}
