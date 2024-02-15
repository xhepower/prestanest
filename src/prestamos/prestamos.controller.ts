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
import { createInterface } from 'readline';
export interface CalculateInt {
  inicio: Date;
  vencimiento: Date;
  capital: number;
  porcentaje: number;
  frecuencia: Frecuencia;
}
export interface createInterface {
  capital: number;
  porcentaje: number;
  porcentajemora: number;
  inicio: Date;
  vencimiento: Date;
  clienteId: number;
}
export interface pagoInterface {
  id: number;
  pago: number;
}
enum Frecuencia {
  Diario = 'diario',
  Semanal = 'semanal',
  Quincenal = 'quincenal',
  Mensual = 'mensual',
}
@ApiTags('prestamos')
@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}
  @ApiOperation({ summary: 'Crear un prestamo.' })
  @Post()
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    if (!createPrestamoDto.frecuencia) {
      createPrestamoDto.frecuencia = Frecuencia.Diario;
    }
    return this.prestamosService.create(createPrestamoDto);
  }
  @ApiOperation({ summary: 'Calcular un prestamo' })
  @Post('calculate')
  calculate(@Body() params) {
    const enviar = params as CalculateInt;
    if (!enviar.frecuencia) {
      enviar.frecuencia = Frecuencia.Diario;
    }

    return this.prestamosService.calculate(enviar);
  }
  @ApiOperation({ summary: 'Plan de un prestamo' })
  @Post('plan')
  plan(@Body() params) {
    const enviar = params as CalculateInt;
    if (!enviar.frecuencia) {
      enviar.frecuencia = Frecuencia.Diario;
    }

    return this.prestamosService.planPago(enviar);
  }
  @ApiOperation({ summary: 'Disminuir una pago a un prestamo' })
  @Post('pagar')
  disminuirPago(@Body() params) {
    const pagar = params as pagoInterface;
    return this.prestamosService.disminuirPago(pagar.id, pagar.pago);
  }
  @ApiOperation({ summary: 'verificar crear moras' })
  @Post('mora')
  mora(@Body() params) {
    return this.prestamosService.crearMora(params.id);
  }
  @ApiOperation({ summary: 'proxima fecha de pago' })
  @Post('proxima')
  proxima(@Body() params) {
    return this.prestamosService.proximaFechapago(
      params.frecuencia,
      params.fecha,
    );
  }
  @ApiOperation({ summary: 'proxima fecha de pago' })
  @Post('actualizar')
  actualizarTodo() {
    return this.prestamosService.actualizarTodo();
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
