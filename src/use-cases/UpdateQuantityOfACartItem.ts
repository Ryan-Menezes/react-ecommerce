import { EntityId } from '@src/entities/Entity';
import { ItemNotFoundError } from '@src/errors/ItemNotFoundError';
import { CartRepository } from '@src/repositories/CartRepository';

export interface UpdateQuantityOfACartItemRequest {
  id: EntityId;
  quantity: number;
}

export class UpdateQuantityOfACartItem {
  public constructor(private cartRepository: CartRepository) {}

  public async execute({
    id,
    quantity,
  }: UpdateQuantityOfACartItemRequest): Promise<void> {
    const item = await this.cartRepository.findById(id);

    if (item === null) {
      throw new ItemNotFoundError(
        'The specified item does not exist in the cart'
      );
    }

    this.cartRepository.updateItemQuantity(id, quantity);
  }
}
