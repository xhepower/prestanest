import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseItPipe } from 'src/common/parse-it/parse-it.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FilterUsersDto } from './dto/filter-users.dto';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Crear un usuario nuevo.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({ summary: 'Obtener todos los usuarios.' })
  @Get()
  findAll(@Query() params: FilterUsersDto) {
    return this.usersService.findAll(params);
  }
  @ApiOperation({ summary: 'Obtener un usuario.' })
  @Get(':id')
  findOne(@Param('id', ParseItPipe) id: string) {
    return this.usersService.findOne(+id);
  }
  @ApiOperation({ summary: 'Modificar un usuario.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @ApiOperation({ summary: 'Eliminar un usuario .' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
