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
@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo) private prestamoRepo: Repository<Prestamo>,
    private clienteService: ClientesService,
  ) {}
  async create(createPrestamoDto: CreatePrestamoDto) {
    const { intereses, cuota, total } = this.calculate(createPrestamoDto);
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
    const viejaCantidad = prestamo.total;
    const nuevaCantidad = viejaCantidad - pago;
    if (nuevaCantidad < 5) {
      estado = Estado.Pagado;
    }
    await this.update(id, { total: nuevaCantidad, estado });
  }
  async crearMora(id: number) {
    const prestamo = await this.findOne(id);
    if (prestamo.estado == Estado.Activo) {
      const { vencimiento } = prestamo;
      if (new Date(vencimiento) < new Date()) {
        const mora = (prestamo.capital * prestamo.porcentajemora) / 100;
        const total = +prestamo.total + mora;
        const estado = Estado.Moroso;
        await this.update(id, { mora, total, estado });
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
          //console.log(prestamo.id, new Date(prestamo.proxima) < new Date());
          const proxima = this.proximaFechapago(
            prestamo.frecuencia,
            prestamo.proxima,
          );
          await this.update(prestamo.id, { proxima });
        } else {
          console.log(prestamo.id, new Date(prestamo.proxima) < new Date());
        }
      }
    });
  }
  calculate(params) {
    const { inicio, vencimiento, capital, porcentaje, frecuencia } = params;
    let numeroCuotas: number = 0;
    const intereses = (porcentaje * capital) / 100;
    const total = capital + intereses;
    const dias = this.contarDiaSinDomingos(inicio, vencimiento);
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
    const cuota = total / numeroCuotas;
    return { intereses, cuota, total, numeroCuotas };
  }
  contarDiaSinDomingos(inicio: Date, vencimiento: Date) {
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
