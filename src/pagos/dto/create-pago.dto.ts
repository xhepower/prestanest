import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class CreatePagoDto {
  @ApiProperty({ description: 'monto' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  monto: number;
  @ApiProperty({ description: 'id de prestamo' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  prestamoId: number;
}
