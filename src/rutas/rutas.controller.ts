import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('rutas')
@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}
  @ApiOperation({ summary: 'Crear una ruta nueva.' })
  @Post()
  create(@Body() createRutaDto: CreateRutaDto) {
    return this.rutasService.create(createRutaDto);
  }
  @ApiOperation({ summary: 'Obtener todas las rutas' })
  @Get()
  findAll() {
    return this.rutasService.findAll();
  }
  @ApiOperation({ summary: 'Obtener una ruta' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rutasService.findOne(+id);
  }
  @ApiOperation({ summary: 'Modificar una ruta' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRutaDto: UpdateRutaDto) {
    return this.rutasService.update(+id, updateRutaDto);
  }
  @ApiOperation({ summary: 'Eliminar una ruta' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutasService.remove(+id);
  }
}
