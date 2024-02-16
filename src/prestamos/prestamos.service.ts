import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { differenceInDays, addDays, getDay } from 'date-fns';
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
export interface CalculateInt {
  inicio: Date;
  vencimiento: Date;
  capital: number;
  porcentaje: number;
  frecuencia: Frecuencia;
}
@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo) private prestamoRepo: Repository<Prestamo>,
    private clienteService: ClientesService,
  ) {}
  async create(createPrestamoDto: CreatePrestamoDto) {
    const { intereses, cuota, total, saldo } =
      this.calculate(createPrestamoDto);

    const newPrestamo = this.prestamoRepo.create(createPrestamoDto);
    if (+createPrestamoDto.clienteId) {
      const cliente = await this.clienteService.findOne(
        createPrestamoDto.clienteId,
      );
      newPrestamo.cliente = cliente;
    }

    newPrestamo.cuota = cuota;
    newPrestamo.intereses = intereses;
    newPrestamo.total = total;
    newPrestamo.saldo = saldo;
    newPrestamo.proxima = this.proximaFechapago(
      newPrestamo.frecuencia,
      newPrestamo.inicio,
    );
    return this.prestamoRepo.save(newPrestamo);
  }
  proximaFechapago(frecuencia: Frecuencia, fecha: Date): Date {
    const laFecha: Date = new Date(fecha);
    do {
      switch (frecuencia) {
        case Frecuencia.Mensual:
          laFecha.setMonth(laFecha.getMonth() + 1);
          if (laFecha.getDay() === 0) {
            laFecha.setDate(laFecha.getDate() + 1);
          }
          break;
        case Frecuencia.Quincenal:
          laFecha.setDate(laFecha.getDate() + 14);
          if (laFecha.getDay() === 0) {
            laFecha.setDate(laFecha.getDate() + 1);
          }
          break;
        case Frecuencia.Semanal:
          laFecha.setDate(laFecha.getDate() + 7);
          if (laFecha.getDay() === 0) {
            laFecha.setDate(laFecha.getDate() + 1);
          }
          break;
        case Frecuencia.Diario:
          laFecha.setDate(laFecha.getDate() + 1);
          if (laFecha.getDay() === 0) {
            laFecha.setDate(laFecha.getDate() + 1);
          }
          break;
        default:
      }
    } while (laFecha < new Date());

    return laFecha;
  }
  async disminuirPago(id: number, pago: number) {
    const prestamo = await this.findOne(id);
    let estado = prestamo.estado;
    const viejoSaldo = prestamo.saldo;
    const nuevoSaldo = viejoSaldo - pago;
    if (nuevoSaldo < 5) {
      estado = Estado.Pagado;
    }
    await this.update(id, { saldo: +nuevoSaldo, estado });
  }
  async crearMora(id: number) {
    const prestamo = await this.findOne(id);
    if (prestamo.estado == Estado.Activo) {
      const { vencimiento } = prestamo;
      if (new Date(vencimiento) < new Date()) {
        const mora = (prestamo.capital * prestamo.porcentajemora) / 100;
        const saldo = +prestamo.saldo + mora;
        const estado = Estado.Moroso;
        await this.update(id, { mora, saldo, estado });
      } else {
      }
    }
  }
  async actualizarTodo() {
    const prestamos = await this.prestamoRepo.find({
      relations: ['cliente'],
    });
    prestamos.map(async (prestamo) => {
      if (prestamo.estado != Estado.Pagado) {
        await this.crearMora(prestamo.id);

        if (new Date(prestamo.proxima) < new Date()) {
          const proxima = this.proximaFechapago(
            prestamo.frecuencia,
            prestamo.proxima,
          );
          await this.update(prestamo.id, { proxima });
        } else {
        }
      }
    });
    return 'OK';
  }
  calculate(params) {
    const { inicio, vencimiento, capital, porcentaje, frecuencia } =
      params as CalculateInt;

    let numeroCuotas: number = 0;
    const intereses: number = +((+porcentaje * +capital) / 100).toFixed(2);
    const total: number = +(capital + intereses).toFixed(2);
    const dias: number = this.contarDiaSinDomingos(inicio, vencimiento);

    switch (frecuencia) {
      case Frecuencia.Quincenal:
        numeroCuotas = Math.ceil(dias / 14);
        break;
      case Frecuencia.Semanal:
        numeroCuotas = Math.ceil(dias / 7);
        break;
      case Frecuencia.Diario:
        numeroCuotas = dias;
        break;
    }

    if (numeroCuotas < 1) {
      numeroCuotas = 1;
    }
    const cuota = +(total / numeroCuotas).toFixed(2);
    const saldo = total;
    return { intereses, cuota, total, numeroCuotas, saldo };
  }
  planPago({
    inicio,
    vencimiento,
    capital,
    porcentaje,
    frecuencia,
  }: CalculateInt) {
    const { intereses, cuota, total, numeroCuotas, saldo } = this.calculate({
      inicio,
      vencimiento,
      capital,
      porcentaje,
      frecuencia,
    });
    const plan = [];
    let elSaldo = saldo;
    let fecha = this.proximaFechapago(frecuencia, inicio);
    for (let i = 1; i <= numeroCuotas; i++) {
      const p = {
        i,
        fecha,
        cuota,
        elSaldo,
        saldonuevo: +(+elSaldo.toFixed(2) - +cuota.toFixed(2)).toFixed(2),
      };
      plan.push(p);
      elSaldo = +p.saldonuevo.toFixed(2);
      fecha = this.proximaFechapago(frecuencia, fecha);
    }
    return { intereses, cuota, total, numeroCuotas, saldo, plan };
  }
  contarDiaSinDomingos(inicio: Date, vencimiento: Date): number {
    let dias = differenceInDays(vencimiento, inicio);
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
      where.inicio = Between(minDate, maxDate);
    }
    return this.prestamoRepo.find({
      relations: ['cliente'],
      where,
      take: limit,
      skip: offset,
      order: { id: 'desc' },
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
