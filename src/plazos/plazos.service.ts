import { Injectable } from '@nestjs/common';
import { CreatePlazoDto } from './dto/create-plazo.dto';
import { UpdatePlazoDto } from './dto/update-plazo.dto';

@Injectable()
export class PlazosService {
  create(createPlazoDto: CreatePlazoDto) {
    return 'This action adds a new plazo';
  }

  findAll() {
    return `This action returns all plazos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plazo`;
  }

  update(id: number, updatePlazoDto: UpdatePlazoDto) {
    return `This action updates a #${id} plazo`;
  }

  remove(id: number) {
    return `This action removes a #${id} plazo`;
  }
}
