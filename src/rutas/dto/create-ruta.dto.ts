import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateRutaDto {
  @ApiProperty({ description: 'nombre de ruta' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'nombre de ruta' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
}
