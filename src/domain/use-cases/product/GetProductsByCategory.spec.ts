import { ProductRepository } from '@src/domain/repositories';
import { GetProductsByCategory } from '@src/domain/use-cases/product';
import productsArrayRepositoryFixture from '@tests/fixtures/products-array-repository';

const makeProductRepositoryMock = () => {
  const productRepository: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    findById: jest.fn(),
    findByCategory: jest.fn(),
  };

  return {
    productRepository,
  };
};

const makeSut = () => {
  const { productRepository } = makeProductRepositoryMock();
  const sut = new GetProductsByCategory(productRepository);

  return {
    productRepository,
    sut,
  };
};

describe('GetProductsByCategory', () => {
  it('should return all products from a given category', async () => {
    const { productRepository, sut } = makeSut();
    const req = { category: 'any-category' };
    productRepository.findByCategory = jest.fn((category) =>
      Promise.resolve(productsArrayRepositoryFixture)
    );

    const response = await sut.execute(req);

    expect(productRepository.findByCategory).toBeCalledTimes(1);
    expect(productRepository.findByCategory).toBeCalledWith(req.category);
    expect(response).toEqual(productsArrayRepositoryFixture);
  });
});
