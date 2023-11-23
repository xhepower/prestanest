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
  @IsPositive()
  limit: number = 10;
  @ApiProperty({ description: 'numero de offset' })
  @IsOptional()
  @Min(0)
  offset: number = 0;
  @ApiProperty({ description: 'numero de offset' })
  @IsOptional()
  @IsDate()
  minDate: Date;
  @ApiProperty({ description: 'numero de offset' })
  @IsOptional()
  @IsDate()
  @ValidateIf((item) => item.minDate)
  maxDate: Date;
}
