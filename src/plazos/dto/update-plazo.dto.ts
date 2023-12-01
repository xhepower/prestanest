import { PartialType } from '@nestjs/swagger';
import { CreatePlazoDto } from './create-plazo.dto';

export class UpdatePlazoDto extends PartialType(CreatePlazoDto) {}
