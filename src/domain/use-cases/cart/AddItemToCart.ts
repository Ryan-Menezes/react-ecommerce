import { EntityId } from '@src/domain/entities';
import { ProductRepository, CartRepository } from '@src/domain/repositories';

export interface AddItemToCartRequest {
  product_id: EntityId;
  price_id: EntityId;
}

export class AddItemToCart {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository
  ) {}

  public async execute({
    product_id,
    price_id,
  }: AddItemToCartRequest): Promise<void> {
    const product = await this.productRepository.findById(product_id);
    if (product === null) {
      throw new Error();
    }

    const price = product.prices.find((price) => price.id === price_id);
    if (price === undefined) {
      throw new Error();
    }

    const id = `${product.id}-${price.id}`;

    await this.cartRepository.addItem({
      id,
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price,
        quantity: 1,
      },
    });
  }
}
