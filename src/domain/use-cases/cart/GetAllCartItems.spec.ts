import { CartItem } from '@src/domain/entities';
import { CartRepository } from '@src/domain/repositories';
import { GetAllCartItems } from '@src/domain/use-cases/cart';
import cartItemObjectRepositoryFixture from '@tests/fixtures/cart-item-object-repository';
import cartGetAllResponseUsecaseFixture from '@tests/fixtures/cart-get-all-response-usecase';

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
  const sut = new GetAllCartItems(cartRepository);

  return {
    cartRepository,
    sut,
  };
};

describe('GetAllCartItems', () => {
  const cartItem1: Readonly<CartItem> = {
    ...cartItemObjectRepositoryFixture,
    id: '123',
  };

  const cartItem2: Readonly<CartItem> = {
    ...cartItemObjectRepositoryFixture,
    id: '456',
  };

  it('should get all cart items', async () => {
    const { cartRepository, sut } = makeSut();
    cartRepository.getAll = jest.fn(() =>
      Promise.resolve([cartItem1, cartItem2])
    );
    cartRepository.total = jest.fn(() => Promise.resolve(62));

    const response = await sut.execute();

    expect(cartRepository.getAll).toBeCalledTimes(1);
    expect(cartRepository.total).toBeCalledTimes(1);
    expect(response).toEqual(cartGetAllResponseUsecaseFixture);
  });
});
