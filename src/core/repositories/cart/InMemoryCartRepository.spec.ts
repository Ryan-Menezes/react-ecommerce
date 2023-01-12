import LocalCache from '@src/core/protocols/cache/LocalCache';
import { CartItem, EntityId } from '@src/domain/entities';
import { InMemoryCartRepository } from '@src/core/repositories/cart';

describe('InMemoryCartRepository', () => {
  it('should create an empty cart', () => {
    const cache = new LocalCache<EntityId, CartItem>();
    const cartRepository = new InMemoryCartRepository(cache);

    expect(cartRepository.getAll()).toEqual([]);
  });
});
