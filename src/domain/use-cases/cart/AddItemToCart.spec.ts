import { CartRepository } from '@src/domain/repositories';
import { AddItemToCart } from '@src/domain/use-cases/cart';
import cartItemObjectRepository from '@tests/fixtures/cart-item-object-repository.json';

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
  const sut = new AddItemToCart(cartRepository);

  return {
    cartRepository,
    sut,
  };
};

describe('AddItemToCart', () => {
  it('should add item to cart', async () => {
    const { cartRepository, sut } = makeSut();
    const req = { item: cartItemObjectRepository };

    await sut.execute(req);

    expect(cartRepository.addItem).toBeCalledTimes(1);
    expect(cartRepository.addItem).toBeCalledWith(req.item);
  });
});
