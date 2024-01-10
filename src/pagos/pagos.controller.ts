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
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { FilterPagosDto } from './dto/filter-pago.dto';
import { ParseItPipe } from 'src/common/parse-it/parse-it.pipe';
@ApiTags('pagos')
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}
  @ApiOperation({ summary: 'Crear un pago.' })
  @Post()
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }
  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @Get()
  findAll(@Query() params: FilterPagosDto) {
    return this.pagosService.findAll(params);
  }
  @ApiOperation({ summary: 'Obtener un pago' })
  @Get(':id')
  findOne(@Param('id', ParseItPipe) id: string) {
    return this.pagosService.findOne(+id);
  }
  @ApiOperation({ summary: 'Modificar un pago' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(+id, updatePagoDto);
  }
  @ApiOperation({ summary: 'Eliminar un pago' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosService.remove(+id);
  }
}
