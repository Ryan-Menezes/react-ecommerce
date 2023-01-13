import { LocalCache } from '@src/core/protocols/cache';
import { UniqueKeyGenerator } from '@src/core/protocols/generator';
import { CartItem, EntityId } from '@src/domain/entities';
import { InMemoryCartRepository } from '@src/core/repositories/cart';
import cartItemObjectRepositoryFixture from '@tests/fixtures/cart-item-object-repository';

const makeSut = () => {
  const keyGenerator: jest.Mocked<UniqueKeyGenerator> = {
    generate: jest.fn(() => Promise.resolve('unique-id')),
  };
  const cache = new LocalCache<EntityId, CartItem>();
  const cartRepository = new InMemoryCartRepository(cache, keyGenerator);

  return {
    cache,
    cartRepository,
    keyGenerator,
  };
};

describe('InMemoryCartRepository', () => {
  const cartItem1: Readonly<CartItem> = {
    ...cartItemObjectRepositoryFixture,
    id: '123',
  };

  const cartItem2: Readonly<CartItem> = {
    ...cartItemObjectRepositoryFixture,
    id: '456',
  };

  it('should create an empty cart', async () => {
    const { cartRepository } = makeSut();

    expect(await cartRepository.getAll()).toEqual([]);
    expect(await cartRepository.total()).toEqual(0);
  });

  it('should add item to cart', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);

    expect(await cartRepository.getAll()).toEqual([cartItem1, cartItem2]);
  });

  it('should generate an id if the cart item passed does not have one', async () => {
    const { cartRepository, keyGenerator } = makeSut();
    const cartItemWithoutId = {
      ...cartItem1,
      id: undefined,
    };

    await cartRepository.addItem(cartItemWithoutId);

    expect(await cartRepository.getAll()).toEqual([
      {
        ...cartItemWithoutId,
        id: 'unique-id',
      },
    ]);
    expect(keyGenerator.generate).toBeCalledTimes(1);
  });

  it('should replace item to cart', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem1);

    expect(await cartRepository.getAll()).toEqual([cartItem1]);
  });

  it('should remove item to cart', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);
    await cartRepository.removeItem(cartItem1.id);

    expect(await cartRepository.getAll()).toEqual([cartItem2]);
  });

  it('should not remove if cart item not found', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);
    await cartRepository.removeItem('invalid-id');

    expect(await cartRepository.getAll()).toEqual([cartItem1, cartItem2]);
  });

  it('should find a cart item by its id', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);

    expect(await cartRepository.findById('456')).toEqual(cartItem2);
  });

  it('should return null if cart item not found', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);

    expect(await cartRepository.findById('invalid-id')).toBe(null);
  });

  it('should update the quantity of a cart item', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);
    await cartRepository.updateItemQuantity(cartItem2.id, 5);

    expect(await cartRepository.getAll()).toEqual([
      cartItem1,
      {
        ...cartItem2,
        product: {
          ...cartItem2.product,
          quantity: 5,
        },
      },
    ]);
  });

  it('should not update the quantity if cart item not found', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);
    await cartRepository.updateItemQuantity('invalid-id', 5);

    expect(await cartRepository.getAll()).toEqual([cartItem1, cartItem2]);
  });

  it('should not update the quantity of a cart item if quantity is invalid', async () => {
    const { cartRepository } = makeSut();
    const invalidQuantity = -1;

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);
    await cartRepository.updateItemQuantity(cartItem2.id, invalidQuantity);

    expect(await cartRepository.getAll()).toEqual([
      cartItem1,
      {
        ...cartItem2,
        product: {
          ...cartItem2.product,
          quantity: 1,
        },
      },
    ]);
  });

  it('should return the subtotal of an cart item ', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);

    expect(await cartRepository.subtotal(cartItem1.id)).toBe(31);
  });

  it('should return zero if cart item not found', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);

    expect(await cartRepository.subtotal('invalid-id')).toBe(0);
  });

  it('should return the total of cart', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);

    expect(await cartRepository.total()).toBe(62);
  });

  it('should clear the cart', async () => {
    const { cartRepository } = makeSut();

    await cartRepository.addItem(cartItem1);
    await cartRepository.addItem(cartItem2);

    expect(await cartRepository.getAll()).toEqual([cartItem1, cartItem2]);
    expect(await cartRepository.total()).toBe(62);

    await cartRepository.clear();

    expect(await cartRepository.getAll()).toEqual([]);
    expect(await cartRepository.total()).toBe(0);
  });
});
