import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlazosService } from './plazos.service';
import { PlazosController } from './plazos.controller';
import { Plazo } from './entities/plazo.entity';

@Module({
  controllers: [PlazosController],
  providers: [PlazosService],
  imports: [TypeOrmModule.forFeature([Plazo])],
})
export class PlazosModule {}
