import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateClienteDto {
  @ApiProperty({ description: 'nombre de cliente' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'id de ruta' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  rutaId: number;
  @ApiProperty({ description: 'numero de identidad' })
  @IsNotEmpty()
  dni: string;
  @IsOptional()
  city: string;
  @IsOptional()
  hood: string;
  @IsOptional()
  business: string;
  @IsOptional()
  phone1: string;
  @IsOptional()
  phone2: string;
}
