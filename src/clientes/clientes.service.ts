import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { FilterClientesDto } from './dto/fliter-cliente.dto';
import { RutasService } from 'src/rutas/rutas.service';
@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    private rutaService: RutasService,
  ) {}
  async create(createClienteDto: CreateClienteDto) {
    const newCliente = this.clienteRepo.create(createClienteDto);
    if (+createClienteDto.rutaId) {
      const ruta = await this.rutaService.findOne(createClienteDto.rutaId);
      newCliente.ruta = ruta;
    }
    return this.clienteRepo.save(newCliente);
  }

  findAll(params?: FilterClientesDto) {
    const { limit, offset, minDate, maxDate } = params;
    const where: FindOptionsWhere<Cliente> = {};
    if (minDate && maxDate) {
      where.created_at = Between(minDate, maxDate);
    }
    return this.clienteRepo.find({
      relations: ['ruta'],
      where,
      take: limit,
      skip: offset,
      order: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepo.findOne({
      where: [{ id }],
      relations: ['ruta'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente #${id} not found`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    this.clienteRepo.merge(cliente, updateClienteDto);
    return this.clienteRepo.save(cliente);
  }

  remove(id: number) {
    return this.clienteRepo.delete(id);
  }
}
