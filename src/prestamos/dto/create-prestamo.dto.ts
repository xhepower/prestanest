import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
enum Estado {
  Activo = 'activo',
  Moroso = 'moroso',
  Pagado = 'pagado',
}
enum Frecuencia {
  Diario = 'diario',
  Semanal = 'semanal',
  Quincenal = 'quincenal',
  Mensual = 'mensual',
}
export class CreatePrestamoDto {
  @ApiProperty({ description: 'capital' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capital: number;
  @ApiProperty({ description: 'porcentaje' })
  @IsNotEmpty()
  @IsNumber()
  porcentaje: number;
  @ApiProperty({ description: 'mora' })
  @IsOptional()
  @IsNumber()
  mora: number;
  @ApiProperty({ description: 'porcentaje de la mora' })
  @IsOptional()
  @IsNumber()
  porcentajemora: number;
  @ApiProperty({ description: 'mora' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  total: number;
  @ApiProperty({ description: 'mora' })
  @IsOptional()
  @IsNumber()
  saldo: number;
  @ApiProperty({ description: 'id de clienbte' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  clienteId: number;
  @ApiProperty({ description: 'fecha de inicio' })
  @IsNotEmpty()
  @IsDate()
  inicio: Date;
  @ApiProperty({ description: 'proxima fecha de pago' })
  @IsOptional()
  @IsDate()
  proxima: Date;
  @ApiProperty({ description: 'fecha de vencimiento' })
  @IsNotEmpty()
  @IsDate()
  vencimiento: Date;
  @ApiProperty({ description: 'estado' })
  @IsOptional()
  estado: Estado;
  @ApiProperty({ description: 'frecuencia' })
  @IsOptional()
  frecuencia: Frecuencia;
}
