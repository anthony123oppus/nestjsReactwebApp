import { Test, TestingModule } from '@nestjs/testing';
import { DevInfoService } from './dev-info.service';

describe('DevInfoService', () => {
  let service: DevInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevInfoService],
    }).compile();

    service = module.get<DevInfoService>(DevInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
