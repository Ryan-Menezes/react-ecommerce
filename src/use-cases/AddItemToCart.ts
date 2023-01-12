import { CartItem } from '@src/entities/CartItem';
import { CartRepository } from '@src/repositories/CartRepository';

export interface AddItemToCartRequest {
  item: CartItem;
}

export class AddItemToCart {
  public constructor(private cartRepository: CartRepository) {}

  public async execute({ item }: AddItemToCartRequest): Promise<void> {
    this.cartRepository.addItem(item);
  }
}
