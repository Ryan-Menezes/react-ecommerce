import { EntityId } from '../../../domain/entities';
import {
  ProductRepository,
  CartRepository,
} from '../../../domain/repositories';
import {
  ProductNotFoundError,
  ProductNotAvailableError,
} from '../../../errors';

export interface AddItemToCartRequest {
  product_id: EntityId;
}

export class AddItemToCart {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository
  ) {}

  public async execute({ product_id }: AddItemToCartRequest): Promise<void> {
    const product = await this.productRepository.findById(product_id);
    if (product === null) {
      throw new ProductNotFoundError(
        'There is no product registered with this id'
      );
    }

    if (product.price === null) {
      throw new ProductNotAvailableError('This product is not available');
    }

    const id = `${product.id}-${product.price.id}`;
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
        price: product.price,
        quantity: 1,
      },
    });
  }
}
