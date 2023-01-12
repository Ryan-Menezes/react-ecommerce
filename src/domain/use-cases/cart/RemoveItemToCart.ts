import { EntityId } from '@src/domain/entities';
import { ItemNotFoundError } from '@src/errors';
import { CartRepository } from '@src/domain/repositories';

export interface RemoveItemToCartRequest {
  id: EntityId;
}

export class RemoveItemToCart {
  public constructor(private readonly cartRepository: CartRepository) {}

  public async execute({ id }: RemoveItemToCartRequest): Promise<void> {
    const item = await this.cartRepository.findById(id);

    if (item === null) {
      throw new ItemNotFoundError(
        'The specified item does not exist in the cart'
      );
    }

    await this.cartRepository.removeItem(id);
  }
}
