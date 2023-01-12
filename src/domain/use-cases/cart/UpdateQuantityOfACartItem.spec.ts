import { ItemNotFoundError } from '@src/errors';
import { CartRepository } from '@src/domain/repositories';
import { UpdateQuantityOfACartItem } from '@src/domain/use-cases/cart';

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
  const sut = new UpdateQuantityOfACartItem(cartRepository);

  return {
    cartRepository,
    sut,
  };
};

describe('UpdateQuantityOfACartItem', () => {
  it('should update quantity of a cart item', async () => {
    const { cartRepository, sut } = makeSut();
    const req = { id: 'any-id', quantity: 2 };

    await sut.execute(req);

    expect(cartRepository.updateItemQuantity).toBeCalledTimes(1);
    expect(cartRepository.updateItemQuantity).toBeCalledWith(
      req.id,
      req.quantity
    );
  });

  it('should throw an error if the item does not exist in the cart', async () => {
    const { cartRepository, sut } = makeSut();
    const req = { id: 'invalid-id', quantity: 2 };
    cartRepository.findById = jest.fn((id) => null);

    const promise = sut.execute(req);

    await expect(promise).rejects.toThrow(ItemNotFoundError);
    expect(cartRepository.updateItemQuantity).toBeCalledTimes(0);
  });
});
