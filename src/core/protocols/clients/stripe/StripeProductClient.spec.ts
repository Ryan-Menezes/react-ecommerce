import { StripeProductClient } from '@src/core/protocols/clients/stripe';

const makeSut = () => {
  const stripeProduct = new StripeProductClient();

  return {
    stripeProduct,
  };
};

describe('StripeProductClient', () => {
  const stripeProductId = 'planreward';
  const stripeProductApi = {
    id: expect.any(String),
    object: expect.any(String),
    active: true,
    attributes: expect.any(Array),
    created: expect.any(Number),
    default_price: null,
    description: null,
    images: expect.any(Array),
    livemode: expect.any(Boolean),
    metadata: expect.any(Object),
    name: expect.any(String),
    package_dimensions: null,
    shippable: null,
    statement_descriptor: null,
    tax_code: null,
    type: expect.any(String),
    unit_label: null,
    updated: expect.any(Number),
    url: null,
  };

  it('should get all products', async () => {
    const { stripeProduct } = makeSut();
    const products = await stripeProduct.getProducts();

    expect(products).toEqual(expect.arrayContaining([stripeProductApi]));
    expect(products.length).toBeLessThanOrEqual(10);
  });

  it('should search for all products that match the search', async () => {
    const { stripeProduct } = makeSut();
    const products = await stripeProduct.getProducts({
      search: 'Gold',
    });

    expect(products).toEqual(
      expect.arrayContaining([
        {
          ...stripeProductApi,
          name: 'Gold Special',
        },
      ])
    );
    expect(products.length).toBeLessThanOrEqual(10);
  });

  it('should find product by id', async () => {
    const { stripeProduct } = makeSut();
    const product = await stripeProduct.getProduct(stripeProductId);

    expect(product).toEqual({
      ...stripeProductApi,
      id: stripeProductId,
    });
  });

  it("should return null if product doesn't exist", async () => {
    const { stripeProduct } = makeSut();
    const product = await stripeProduct.getProduct('invalid-id');

    expect(product).toEqual(null);
  });

  it('should get all prices to product', async () => {
    const { stripeProduct } = makeSut();
    const prices = await stripeProduct.getPricesTo(stripeProductId);

    expect(prices).toEqual(expect.any(Array));
  });
});
