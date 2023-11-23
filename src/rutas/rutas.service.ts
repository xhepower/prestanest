import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ruta } from './entities/ruta.entity';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class RutasService {
  constructor(
    @InjectRepository(Ruta) private rutaRepo: Repository<Ruta>,
    private userService: UsersService,
  ) {}
  async create(createRutaDto: CreateRutaDto) {
    const newRuta = this.rutaRepo.create(createRutaDto);
    if (+createRutaDto.userId) {
      const user = await this.userService.findOne(createRutaDto.userId);
      newRuta.user = user;
    }
    return this.rutaRepo.save(newRuta);
  }

  findAll() {
    return this.rutaRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const ruta = await this.rutaRepo.findOne({
      where: [{ id }],
      relations: ['user'],
    });
    if (!ruta) {
      throw new NotFoundException(`Ruta #${id} not found`);
    }
    return ruta;
  }

  async update(id: number, updateRutaDto: UpdateRutaDto) {
    const ruta = await this.findOne(id);
    this.rutaRepo.merge(ruta, updateRutaDto);
    return this.rutaRepo.save(ruta);
  }

  remove(id: number) {
    return this.rutaRepo.delete(id);
  }
}
