import Stripe from 'stripe';

export type StripeProductClientParams = {
  search?: string;
  limit?: number;
};
export type StripeProductClientResponse = Stripe.Product;
export type StripePriceClientResponse = Stripe.Price;

export interface StripeProductClient {
  getProducts(
    params: StripeProductClientParams
  ): Promise<StripeProductClientResponse[]>;
  getProduct(product_id: string): Promise<StripeProductClientResponse | null>;
  getPricesTo(product_id: string): Promise<StripePriceClientResponse[]>;
}

export class StripeProductClient implements StripeProductClient {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('sk_test_Ho24N7La5CVDtbmpjc377lJI', {
      apiVersion: '2022-11-15',
    });
  }

  public async getProducts({
    search,
    limit,
  }: StripeProductClientParams = {}): Promise<StripeProductClientResponse[]> {
    limit = limit ?? 10;

    if (search) {
      const { data } = await this.stripe.products.search({
        query: `active:\'true\' AND name:\'${search}\'`,
        limit,
      });

      return data;
    }

    const { data } = await this.stripe.products.list({
      active: true,
      limit,
    });

    return data;
  }

  public async getProduct(
    id: string
  ): Promise<StripeProductClientResponse | null> {
    try {
      const product = await this.stripe.products.retrieve(id);
      return product;
    } catch (error) {
      return null;
    }
  }

  public async getPricesTo(id: string): Promise<StripePriceClientResponse[]> {
    const prices = await this.stripe.prices.list({
      product: id,
      active: true,
      limit: 100,
      currency: 'usd',
      type: 'one_time',
    });

    return prices.data;
  }
}
