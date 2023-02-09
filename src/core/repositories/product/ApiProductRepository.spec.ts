import { ApiProductRepository } from '@src/core/repositories/product';

const makeSut = () => {
  const sut = new ApiProductRepository();

  return {
    sut,
  };
};

describe('ApiProductRepository', () => {
  it('should return all products', async () => {
    const { sut } = makeSut();

    const products = await sut.getAll();

    expect(products).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name: expect.any(String),
          description: null,
          price: null,
          images: [],
          metadata: expect.any(Object),
        },
      ])
    );
  });

  it('should search for a product by its id', async () => {
    const { sut } = makeSut();

    const product = await sut.findById('prod_NJ7hy4F06B2UOZ');

    expect(product).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      description: null,
      price: null,
      images: [],
      metadata: expect.any(Object),
    });
  });

  it('should return null if the product sought does not exist', async () => {
    const { sut } = makeSut();

    const product = await sut.findById('invalid-id');

    expect(product).toEqual(null);
  });
});
