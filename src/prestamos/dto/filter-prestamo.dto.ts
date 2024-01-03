import {
  IsPositive,
  IsOptional,
  Min,
  IsDate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class FilterPrestamosDto {
  @ApiProperty({ description: 'tamaño de offset' })
  @IsOptional()
  @IsPositive()
  limit: number = 10;
  @ApiProperty({ description: 'numero de offset' })
  @IsOptional()
  @Min(0)
  offset: number = 0;
  @ApiProperty({ description: 'inico de fecha-filtro' })
  @IsOptional()
  @IsDate()
  minDate: Date;
  @ApiProperty({ description: 'fin de fecha-filtro' })
  @IsOptional()
  @IsDate()
  @ValidateIf((item) => item.minDate)
  maxDate: Date;
}
