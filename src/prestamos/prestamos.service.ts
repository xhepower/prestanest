import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
const { differenceInDays, addDays, format, getDay } = require('date-fns');
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FilterPrestamosDto } from './dto/filter-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { ClientesService } from 'src/clientes/clientes.service';
enum Estado {
  Activo = 'activo',
  Moroso = 'moroso',
  Pagado = 'pagado',
}
enum Frecuencia {
  Diario = 'diario',
  Semanal = 'semanal',
  Quincenal = 'quincenal',
  Mensual = 'mensual',
}
@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo) private prestamoRepo: Repository<Prestamo>,
    private clienteService: ClientesService,
  ) {}
  async create(createPrestamoDto: CreatePrestamoDto) {
    const { inicio, vencimiento, capital, porcentaje } = createPrestamoDto;
    const { intereses, cuota, total } = this.calculate(createPrestamoDto);
    const newPrestamo = this.prestamoRepo.create(createPrestamoDto);
    if (+createPrestamoDto.clienteId) {
      const cliente = await this.clienteService.findOne(
        createPrestamoDto.clienteId,
      );
      newPrestamo.cliente = cliente;
    }
    newPrestamo.inicio = new Date(newPrestamo.inicio);
    newPrestamo.vencimiento = new Date(newPrestamo.vencimiento);
    newPrestamo.cuota = cuota;
    newPrestamo.intereses = intereses;
    newPrestamo.total = total;
    return this.prestamoRepo.save(newPrestamo);
  }
  async disminuirPago(id: number, pago: number) {
    const prestamo = await this.findOne(id);
    const viejaCantidad = prestamo.total;
    const nuevaCantidad = viejaCantidad - pago;
    await this.update(id, { total: nuevaCantidad });
  }
  async crearMora(id: number) {
    const prestamo = await this.findOne(id);
    if (prestamo.estado == Estado.Activo) {
      console.log('jueouita');
      const { vencimiento } = prestamo;
      console.log(new Date(vencimiento), new Date());
      if (new Date(vencimiento) < new Date()) {
        const mora = (prestamo.capital * prestamo.porcentajemora) / 100;
        const total = +prestamo.total + mora;
        const estado = Estado.Moroso;
        await this.update(id, { mora, total, estado });
      } else {
        console.log('activo');
      }
    }
  }
  calculate(params) {
    const { inicio, vencimiento, capital, porcentaje } = params;
    const intereses = (porcentaje * capital) / 100;
    const total = capital + intereses;
    const dias = this.contarDiaSinDomingos(inicio, vencimiento);
    const cuota = total / dias;
    return { intereses, cuota, total };
  }
  contarDiaSinDomingos(inicio: Date, vencimiento: Date) {
    let dias = differenceInDays(vencimiento, inicio);
    console.log(dias);
    let fechaActual = inicio;

    for (let i = 0; i < dias; i++) {
      // Excluir domingos (domingo tiene valor 0 en date-fns)
      if (getDay(fechaActual) === 0) {
        dias--;
      }

      fechaActual = addDays(fechaActual, 1);
    }

    return dias;
  }

  findAll(params: FilterPrestamosDto) {
    const { limit, offset, minDate, maxDate } = params;
    const where: FindOptionsWhere<Prestamo> = {};
    if (minDate && maxDate) {
      where.created_at = Between(minDate, maxDate);
    }
    return this.prestamoRepo.find({
      relations: ['cliente'],
      where,
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const prestamo = await this.prestamoRepo.findOne({
      where: [{ id }],
      relations: ['cliente'],
    });
    if (!prestamo) {
      throw new NotFoundException(`Prestamo #${id} not found`);
    }
    return prestamo;
  }

  async update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    const prestamo = await this.findOne(id);
    this.prestamoRepo.merge(prestamo, updatePrestamoDto);
    return this.prestamoRepo.save(prestamo);
  }

  remove(id: number) {
    return this.prestamoRepo.delete(id);
  }
}
