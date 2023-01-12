import { EntityId } from '@src/entities/Entity';
import { ItemNotFoundError } from '@src/errors/ItemNotFoundError';
import { CartRepository } from '@src/repositories/CartRepository';

export interface GetSubtotalOfACartItemRequest {
  id: EntityId;
}

export class GetSubtotalOfACartItem {
  public constructor(private cartRepository: CartRepository) {}

  public async execute({ id }: GetSubtotalOfACartItemRequest): Promise<number> {
    const item = await this.cartRepository.findById(id);

    if (item === null) {
      throw new ItemNotFoundError(
        'The specified item does not exist in the cart'
      );
    }

    return this.cartRepository.subtotal(id);
  }
}
