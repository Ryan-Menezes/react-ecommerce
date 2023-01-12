import LocalCache from '@src/core/protocols/cache/LocalCache';
import { CartItem, EntityId } from '@src/domain/entities';
import { InMemoryCartRepository } from '@src/core/repositories/cart';
import cartItemObjectRepository from '@tests/fixtures/cart-item-object-repository';

const makeSut = () => {
  const cache = new LocalCache<EntityId, CartItem>();
  const cartRepository = new InMemoryCartRepository(cache);

  return {
    cache,
    cartRepository,
  };
};

describe('InMemoryCartRepository', () => {
  const cartItem1 = {
    ...cartItemObjectRepository,
    id: '123',
  };

  const cartItem2 = {
    ...cartItemObjectRepository,
    id: '456',
  };

  it('should create an empty cart', () => {
    const { cartRepository } = makeSut();

    expect(cartRepository.getAll()).toEqual([]);
    expect(cartRepository.total()).toEqual(0);
  });

  it('should add item to cart', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);

    expect(cartRepository.getAll()).toEqual([
      cartItem1,
      cartItem2,
    ]);
  });

  it('should replace item to cart', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem1);

    expect(cartRepository.getAll()).toEqual([
      cartItem1,
    ]);
  });

  it('should remove item to cart', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);
    cartRepository.removeItem(cartItem1.id);

    expect(cartRepository.getAll()).toEqual([cartItem2]);
  });

  it('should not remove if cart item not found', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);
    cartRepository.removeItem('invalid-id');

    expect(cartRepository.getAll()).toEqual([
      cartItem1,
      cartItem2,
    ]);
  });

  it('should find a cart item by its id', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);

    expect(cartRepository.findById('456')).toEqual(cartItem2);
  });

  it('should return null if cart item not found', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);

    expect(cartRepository.findById('invalid-id')).toBe(null);
  });

  it('should update the quantity of a cart item', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);
    cartRepository.updateItemQuantity(cartItem2.id, 5);

    expect(cartRepository.getAll()).toEqual([
      cartItem1,
      {
        ...cartItem2,
        quantity: 5,
      },
    ]);
  });

  it('should not update the quantity if cart item not found', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);
    cartRepository.updateItemQuantity('invalid-id', 5);

    expect(cartRepository.getAll()).toEqual([
      cartItem1,
      cartItem2,
    ]);
  });

  it('should not update the quantity of a cart item if quantity is invalid', () => {
    const { cartRepository } = makeSut();
    const invalidQuantity = -1;

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);
    cartRepository.updateItemQuantity(cartItem2.id, invalidQuantity);

    expect(cartRepository.getAll()).toEqual([
      cartItem1,
      {
        ...cartItem2,
        quantity: 1,
      },
    ]);
  });

  it('should return the subtotal of an cart item ', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);

    expect(cartRepository.subtotal(cartItem1.id)).toBe(31);
  });

  it('should return zero if cart item not found', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);

    expect(cartRepository.subtotal('invalid-id')).toBe(0);
  });

  it('should return the total of cart', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);

    expect(cartRepository.total()).toBe(62);
  });

  it('should clear the cart', () => {
    const { cartRepository } = makeSut();

    cartRepository.addItem(cartItem1);
    cartRepository.addItem(cartItem2);

    expect(cartRepository.getAll()).toEqual([
      cartItem1,
      cartItem2,
    ]);
    expect(cartRepository.total()).toBe(62);

    cartRepository.clear();

    expect(cartRepository.getAll()).toEqual([]);
    expect(cartRepository.total()).toBe(0);
  });
});
