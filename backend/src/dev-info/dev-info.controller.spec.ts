import { Test, TestingModule } from '@nestjs/testing';
import { DevInfoController } from './dev-info.controller';

describe('DevInfoController', () => {
  let controller: DevInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevInfoController],
    }).compile();

    controller = module.get<DevInfoController>(DevInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
