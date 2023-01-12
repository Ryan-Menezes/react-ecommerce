import { Product } from '@src/entities';
import { ProductNotFoundError } from '@src/errors';
import { ProductRepository } from '@src/repositories';
import { GetProductById } from '@src/use-cases/product';

const makeProductRepositoryMock = () => {
  const product: Product = {
    id: 'any-id',
    name: 'shirt',
    description: 'any-description',
    images: [],
    prices: [],
  };

  const productRepository: jest.Mocked<ProductRepository> = {
    getAll: jest.fn(),
    findById: jest.fn((id) => product),
    findByCategory: jest.fn(),
  };

  return {
    product,
    productRepository,
  };
};

const makeSut = () => {
  const { product, productRepository } = makeProductRepositoryMock();
  const sut = new GetProductById(productRepository);

  return {
    product,
    productRepository,
    sut,
  };
};

describe('GetProductById', () => {
  it('should return product of a specific id', async () => {
    const { product, productRepository, sut } = makeSut();
    const req = { id: 'any-id' };

    const response = await sut.execute(req);

    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.id);
    expect(response).toEqual(product);
  });

  it('should throw an error if the product does not exist', async () => {
    const { productRepository, sut } = makeSut();
    const req = { id: 'invalid-id' };
    productRepository.findById = jest.fn((id) => null);

    const promise = sut.execute(req);

    await expect(promise).rejects.toThrow(ProductNotFoundError);
    expect(productRepository.findById).toBeCalledTimes(1);
    expect(productRepository.findById).toBeCalledWith(req.id);
  });
});