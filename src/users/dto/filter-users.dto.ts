import {
  IsPositive,
  IsOptional,
  Min,
  IsDate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class FilterUsersDto {
  @ApiProperty({ description: 'tamaño de offset' })
  @IsOptional()
  limit: number = 0;
  @ApiProperty({ description: 'numero de offset' })
  @IsOptional()
  @Min(0)
  offset: number = 0;
  @ApiProperty({ description: 'filtro-inicio de fecha' })
  @IsOptional()
  @IsDate()
  minDate: Date;
  @ApiProperty({ description: 'filtro-fin de fecha' })
  @IsOptional()
  @IsDate()
  @ValidateIf((item) => item.minDate)
  maxDate: Date;
}
//para guardar
