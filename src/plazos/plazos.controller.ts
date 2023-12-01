import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlazosService } from './plazos.service';
import { CreatePlazoDto } from './dto/create-plazo.dto';
import { UpdatePlazoDto } from './dto/update-plazo.dto';

@Controller('plazos')
export class PlazosController {
  constructor(private readonly plazosService: PlazosService) {}

  @Post()
  create(@Body() createPlazoDto: CreatePlazoDto) {
    return this.plazosService.create(createPlazoDto);
  }

  @Get()
  findAll() {
    return this.plazosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plazosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlazoDto: UpdatePlazoDto) {
    return this.plazosService.update(+id, updatePlazoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plazosService.remove(+id);
  }
}
