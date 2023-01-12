import { EntityId } from '@src/entities/Entity';
import { ItemNotFoundError } from '@src/errors/ItemNotFoundError';
import { CartRepository } from '@src/repositories/CartRepository';

export interface RemoveItemToCartRequest {
  id: EntityId;
}

export class RemoveItemToCart {
  public constructor(private cartRepository: CartRepository) {}

  public async execute({ id }: RemoveItemToCartRequest): Promise<void> {
    const item = await this.cartRepository.findById(id);

    if (item === null) {
      throw new ItemNotFoundError(
        'The specified item does not exist in the cart'
      );
    }

    this.cartRepository.removeItem(id);
  }
}
