import { CartItem } from '@src/domain/entities';
import { CartRepository } from '@src/domain/repositories';

export interface AddItemToCartRequest {
  item: CartItem;
}

export class AddItemToCart {
  public constructor(private readonly cartRepository: CartRepository) {}

  public async execute({ item }: AddItemToCartRequest): Promise<void> {
    this.cartRepository.addItem(item);
  }
}
