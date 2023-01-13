import { ProductRepository, CartRepository } from '@src/domain/repositories';
import { AddItemToCart } from '@src/domain/use-cases/cart';
import { ProductNotFoundError } from '@src/errors';
import { PriceNotFoundError } from '@src/errors/PriceNotFoundError';
import cartItemObjectRepositoryFixture from '@tests/fixtures/cart-item-object-repository';
import productObjectRepositoryFixture from '@tests/fixtures/product-object-repository';

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
      Promise.resolve(productObjectRepositoryFixture)
    );
    cartRepository.findById = jest.fn((id) => Promise.resolve(null));

    await sut.execute(req);

    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.product_id);
    expect(cartRepository.updateItemQuantity).toBeCalledTimes(0);
    expect(cartRepository.addItem).toBeCalledTimes(1);
  });

  it('should add the quantity plus 1, if the item already exists in the cart', async () => {
    const { productRepository, cartRepository, sut } = makeSut();
    const req = { product_id: 'any-id', price_id: 'any-id' };
    productRepository.findById = jest.fn((id) =>
      Promise.resolve(productObjectRepositoryFixture)
    );
    cartRepository.findById = jest.fn((id) =>
      Promise.resolve(cartItemObjectRepositoryFixture)
    );

    await sut.execute(req);

    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.product_id);
    expect(cartRepository.updateItemQuantity).toBeCalledTimes(1);
    expect(cartRepository.updateItemQuantity).toBeCalledWith(
      `${req.product_id}-${req.price_id}`,
      3
    );
    expect(cartRepository.addItem).toBeCalledTimes(0);
  });

  it("Should throw an error if the product doesn't exist", async () => {
    const { productRepository, cartRepository, sut } = makeSut();
    const req = { product_id: 'invalid-id', price_id: 'any-id' };
    productRepository.findById = jest.fn((id) => Promise.resolve(null));

    const promise = sut.execute(req);

    await expect(promise).rejects.toThrow(ProductNotFoundError);
    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.product_id);
    expect(cartRepository.updateItemQuantity).toBeCalledTimes(0);
    expect(cartRepository.addItem).toBeCalledTimes(0);
  });

  it("Should throw an error if the price doesn't exist", async () => {
    const { productRepository, cartRepository, sut } = makeSut();
    const req = { product_id: 'any-id', price_id: 'invalid-id' };
    productRepository.findById = jest.fn((id) =>
      Promise.resolve(productObjectRepositoryFixture)
    );

    const promise = sut.execute(req);

    await expect(promise).rejects.toThrow(PriceNotFoundError);
    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.product_id);
    expect(cartRepository.updateItemQuantity).toBeCalledTimes(0);
    expect(cartRepository.addItem).toBeCalledTimes(0);
  });
});
