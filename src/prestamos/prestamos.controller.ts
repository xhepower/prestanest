import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { FilterPrestamosDto } from './dto/filter-prestamo.dto';
import { ParseItPipe } from 'src/common/parse-it/parse-it.pipe';
@ApiTags('prestamos')
@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}
  @ApiOperation({ summary: 'Crear un prestamo.' })
  @Post()
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamosService.create(createPrestamoDto);
  }
  @Post('calculate')
  calculate(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamosService.calculate(createPrestamoDto);
  }
  @ApiOperation({ summary: 'Obtener todos los prestamos' })
  @Get()
  findAll(@Query() params: FilterPrestamosDto) {
    return this.prestamosService.findAll(params);
  }
  @ApiOperation({ summary: 'Obtener un prestamo' })
  @Get(':id')
  findOne(@Param('id', ParseItPipe) id: string) {
    return this.prestamosService.findOne(+id);
  }
  @ApiOperation({ summary: 'Modificar un prestamo' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrestamoDto: UpdatePrestamoDto,
  ) {
    return this.prestamosService.update(+id, updatePrestamoDto);
  }
  @ApiOperation({ summary: 'Eliminar un prestamo' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamosService.remove(+id);
  }
}
