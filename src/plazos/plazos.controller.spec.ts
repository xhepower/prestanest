import { Test, TestingModule } from '@nestjs/testing';
import { PlazosController } from './plazos.controller';
import { PlazosService } from './plazos.service';

describe('PlazosController', () => {
  let controller: PlazosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlazosController],
      providers: [PlazosService],
    }).compile();

    controller = module.get<PlazosController>(PlazosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
