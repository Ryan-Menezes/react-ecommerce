import { CartItem } from '@src/entities/CartItem';
import { CartRepository } from '@src/repositories/CartRepository';
import { AddItemToCart } from '@src/use-cases/AddItemToCart';

const makeCartRepositoryMock = () => {
  const item: CartItem = {
    product: {
      id: 'any-id',
      name: 'shirt',
      description: 'any-description',
      images: [],
      prices: [],
    },
    price: {
      value: 15.5,
    },
    quantity: 1,
  };

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
    item,
    cartRepository,
  };
};

const makeSut = () => {
  const { item, cartRepository } = makeCartRepositoryMock();
  const sut = new AddItemToCart(cartRepository);

  return {
    item,
    cartRepository,
    sut,
  };
};

describe('AddItemToCart', () => {
  it('should add item to cart', async () => {
    const { item, cartRepository, sut } = makeSut();
    const req = { item };

    sut.execute(req);

    expect(cartRepository.addItem).toBeCalledTimes(1);
    expect(cartRepository.addItem).toBeCalledWith(req.item);
  });
});
