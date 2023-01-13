import { EntityId } from '@src/domain/entities';
import { ProductRepository, CartRepository } from '@src/domain/repositories';
import { ProductNotFoundError } from '@src/errors';
import { PriceNotFoundError } from '@src/errors/PriceNotFoundError';

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
      throw new ProductNotFoundError(
        'There is no product registered with this id'
      );
    }

    const price = product.prices.find((price) => price.id === price_id);
    if (price === undefined) {
      throw new PriceNotFoundError(
        'This price is not available for this product'
      );
    }

    const id = `${product.id}-${price.id}`;
    const item = await this.cartRepository.findById(id);

    if (item !== null) {
      const quantity = item.product.quantity + 1;
      await this.cartRepository.updateItemQuantity(id, quantity);
      return;
    }

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
