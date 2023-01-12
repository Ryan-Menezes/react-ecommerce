import { ItemNotFoundError } from '@src/errors';
import { CartRepository } from '@src/domain/repositories';
import { RemoveItemToCart } from '@src/domain/use-cases/cart';

const makeCartRepositoryMock = () => {
  const cartRepository: jest.Mocked<CartRepository> = {
    getAll: jest.fn(),
    findById: jest.fn(),
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateItemQuantity: jest.fn(),
    subtotal: jest.fn(),
    total: jest.fn(),
    clear: jest.fn(),
  };

  return {
    cartRepository,
  };
};

const makeSut = () => {
  const { cartRepository } = makeCartRepositoryMock();
  const sut = new RemoveItemToCart(cartRepository);

  return {
    cartRepository,
    sut,
  };
};

describe('RemoveItemToCart', () => {
  it('should remove item to cart', async () => {
    const { cartRepository, sut } = makeSut();
    const req = { id: 'any-id' };

    await sut.execute(req);

    expect(cartRepository.removeItem).toBeCalledTimes(1);
    expect(cartRepository.removeItem).toBeCalledWith(req.id);
  });

  it('should throw an error if the item does not exist in the cart', async () => {
    const { cartRepository, sut } = makeSut();
    const req = { id: 'invalid-id' };
    cartRepository.findById = jest.fn((id) => null);

    const promise = sut.execute(req);

    await expect(promise).rejects.toThrow(ItemNotFoundError);
    expect(cartRepository.removeItem).toBeCalledTimes(0);
  });
});
