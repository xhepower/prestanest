import { Test, TestingModule } from '@nestjs/testing';
import { PlazosService } from './plazos.service';

describe('PlazosService', () => {
  let service: PlazosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlazosService],
    }).compile();

    service = module.get<PlazosService>(PlazosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
