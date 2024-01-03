import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FilterPrestamosDto } from './dto/filter-prestamo.dto';
import { Prestamo } from './entities/prestamo.entity';
import { ClientesService } from 'src/clientes/clientes.service';
@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo) private prestamoRepo: Repository<Prestamo>,
    private clienteService: ClientesService,
  ) {}
  async create(createPrestamoDto: CreatePrestamoDto) {
    const newPrestamo = this.prestamoRepo.create(createPrestamoDto);
    if (+createPrestamoDto.clienteId) {
      const cliente = await this.clienteService.findOne(
        createPrestamoDto.clienteId,
      );
      newPrestamo.cliente = cliente;
      newPrestamo.inicio = new Date(newPrestamo.inicio);
      newPrestamo.vencimiento = new Date(newPrestamo.vencimiento);
    }
    return this.prestamoRepo.save(newPrestamo);
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
  calculate(createPrestamoDto: CreatePrestamoDto) {
    return createPrestamoDto;
  }

  findOne(id: number) {
    return `This action returns a #${id} prestamo`;
  }

  update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return `This action updates a #${id} prestamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} prestamo`;
  }
}
