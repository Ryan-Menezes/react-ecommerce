import { CartRepository } from '@src/repositories/CartRepository';
import { RemoveItemToCart } from '@src/use-cases/RemoveItemToCart';

const makeCartRepositoryMock = () => {
  const cartRepository: jest.Mocked<CartRepository> = {
    getAll: jest.fn(),
    findById: jest.fn(),
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateItemQuantity: jest.fn(),
    subtotal: jest.fn(),
    total: jest.fn(),
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
    const params = { id: 'any-id' };

    await sut.execute(params);

    expect(cartRepository.removeItem).toBeCalledTimes(1);
    expect(cartRepository.removeItem).toBeCalledWith(params.id);
  });

  it('should throw an error if the item does not exist in the cart', async () => {
    const { cartRepository, sut } = makeSut();
    const params = { id: 'invalid-id' };
    cartRepository.findById = jest.fn((id) => null);

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrowError(Error);
  });
});
