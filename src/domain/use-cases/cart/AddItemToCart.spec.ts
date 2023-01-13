import { ProductRepository, CartRepository } from '@src/domain/repositories';
import { AddItemToCart } from '@src/domain/use-cases/cart';
import productObjectRepository from '@tests/fixtures/product-object-repository';

const makeRepositoriesMock = () => {
  const productRepository: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    findById: jest.fn(),
    findByCategory: jest.fn(),
  };

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
    productRepository,
    cartRepository,
  };
};

const makeSut = () => {
  const { productRepository, cartRepository } = makeRepositoriesMock();
  const sut = new AddItemToCart(productRepository, cartRepository);

  return {
    productRepository,
    cartRepository,
    sut,
  };
};

describe('AddItemToCart', () => {
  it('should add item to cart', async () => {
    const { productRepository, cartRepository, sut } = makeSut();
    const req = { product_id: 'any-id', price_id: 'any-id' };
    productRepository.findById = jest.fn((id) =>
      Promise.resolve(productObjectRepository)
    );

    await sut.execute(req);

    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.product_id);
    expect(cartRepository.addItem).toBeCalledTimes(1);
  });

  it.skip('should add the quantity plus 1, if the item already exists in the cart', async () => {
    const { productRepository, cartRepository, sut } = makeSut();
    const req = { product_id: 'any-id', price_id: 'any-id' };
    productRepository.findById = jest.fn((id) =>
      Promise.resolve(productObjectRepository)
    );

    await sut.execute(req);

    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.product_id);
    expect(cartRepository.updateItemQuantity).toBeCalledTimes(1);
    expect(cartRepository.updateItemQuantity).toBeCalledWith(
      `${req.product_id}-${req.price_id}`,
      2
    );
    expect(cartRepository.addItem).toBeCalledTimes(0);
  });
});
