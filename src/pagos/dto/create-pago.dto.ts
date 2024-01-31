import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class CreatePagoDto {
  @ApiProperty({ description: 'monto' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  monto: number;
  @ApiProperty({ description: 'saldo anterior' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  saldoAnterior: number;
  @ApiProperty({ description: 'saldo actual' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  saldoActual: number;
  @ApiProperty({ description: 'fecha de pago' })
  @IsNotEmpty()
  @IsDate()
  fecha: Date;
  @ApiProperty({ description: 'id de prestamo' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  prestamoId: number;
}
