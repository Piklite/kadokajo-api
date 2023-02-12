import { Test, TestingModule } from '@nestjs/testing';
import { WishlistsPartakersService } from './wishlists-partakers.service';

describe('WishlistsPartakersService', () => {
  let service: WishlistsPartakersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistsPartakersService],
    }).compile();

    service = module.get<WishlistsPartakersService>(WishlistsPartakersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
