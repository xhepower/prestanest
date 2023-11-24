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
import { ParseItPipe } from 'src/common/parse-it/parse-it.pipe';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FilterClientesDto } from './dto/fliter-cliente.dto';
@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}
  @ApiOperation({ summary: 'Crear un cliente nuevo.' })
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @Get()
  findAll(@Query() params: FilterClientesDto) {
    return this.clientesService.findAll(params);
  }
  @ApiOperation({ summary: 'Obtener un cliente' })
  @Get(':id')
  findOne(@Param('id', ParseItPipe) id: string) {
    return this.clientesService.findOne(+id);
  }
  @ApiOperation({ summary: 'Modificar un cleinte' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}
