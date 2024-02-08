import { IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateReporteDto {
  @ApiProperty({ description: 'fecha de inicio' })
  @IsNotEmpty()
  @IsDate()
  inicio: Date;
  @ApiProperty({ description: 'fecha final' })
  @IsNotEmpty()
  @IsDate()
  final: Date;
}
