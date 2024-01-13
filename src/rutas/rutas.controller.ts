import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParseItPipe } from 'src/common/parse-it/parse-it.pipe';
import { RutasService } from './rutas.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
// importamos el nuevo guadian
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FilterRutasDto } from './dto/filter-ruta-dto';
//import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@ApiTags('rutas')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  findAll(@Query() params: FilterRutasDto) {
    return this.rutasService.findAll(params);
  }
  @ApiOperation({ summary: 'Obtener una ruta' })
  @Get(':id')
  findOne(@Param('id', ParseItPipe) id: string) {
    return this.rutasService.findOne(+id);
  }
  @ApiOperation({ summary: 'Modificar una ruta' })
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRutaDto: UpdateRutaDto) {
    return this.rutasService.update(+id, updateRutaDto);
  }
  @ApiOperation({ summary: 'Eliminar una ruta' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutasService.remove(+id);
  }
}
