import { EntityId } from '@src/domain/entities';
import { ItemNotFoundError } from '@src/errors';
import { CartRepository } from '@src/domain/repositories';

export interface GetSubtotalOfACartItemRequest {
  id: EntityId;
}

export class GetSubtotalOfACartItem {
  public constructor(private readonly cartRepository: CartRepository) {}

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
