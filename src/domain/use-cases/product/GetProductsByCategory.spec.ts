import { Product } from '@src/domain/entities';
import { ProductRepository } from '@src/domain/repositories';
import { GetProductsByCategory } from '@src/domain/use-cases/product';

const makeProductRepositoryMock = () => {
  const products: Product[] = [
    {
      id: 'any-id',
      name: 'shirt',
      description: 'any-description',
      images: [],
      prices: [],
    },
    {
      id: 'any-id',
      name: 'shoe',
      description: 'any-description',
      images: [],
      prices: [],
    },
  ];

  const productRepository: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    findById: jest.fn(),
    findByCategory: jest.fn((category) => products),
  };

  return {
    products,
    productRepository,
  };
};

const makeSut = () => {
  const { products, productRepository } = makeProductRepositoryMock();
  const sut = new GetProductsByCategory(productRepository);

  return {
    products,
    productRepository,
    sut,
  };
};

describe('GetProductsByCategory', () => {
  it('should return all products from a given category', async () => {
    const { products, productRepository, sut } = makeSut();
    const req = { category: 'any-category' };

    const response = await sut.execute(req);

    expect(productRepository.findByCategory).toBeCalledTimes(1);
    expect(productRepository.findByCategory).toBeCalledWith(req.category);
    expect(response).toEqual(products);
  });
});
