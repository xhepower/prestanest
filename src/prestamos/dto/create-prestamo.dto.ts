import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class CreatePrestamoDto {
  @ApiProperty({ description: 'monto de prestamo' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capital: number;
  @ApiProperty({ description: 'porcentaje de interes (100%)' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  porcentaje: number;
  @ApiProperty({ description: 'fecha de inicio' })
  @IsNotEmpty()
  @IsDate()
  inicio: Date;
  @ApiProperty({ description: 'id de plazo' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  plazoId: number;
  @ApiProperty({ description: 'plazo en dias habiles' })
  @IsOptional()
  frecuencia: string;
}
