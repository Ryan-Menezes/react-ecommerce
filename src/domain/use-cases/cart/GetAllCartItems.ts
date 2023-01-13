import { CartItem } from '@src/domain/entities';
import { CartRepository } from '@src/domain/repositories';

export interface CartItemResponse extends CartItem {
  subtotal: number;
};

export interface GetAllCartItemsResponse {
  items: CartItemResponse[];
  total: number;
};

export class GetAllCartItems {
  public constructor(private readonly cartRepository: CartRepository) {}

  public async execute(): Promise<GetAllCartItemsResponse> {
    const items = await this.cartRepository.getAll();
    const total = await this.cartRepository.total();

    const itemsWithSubtotal = items.map(this.addSubtotalToItem);

    return {
      items: itemsWithSubtotal,
      total,
    }
  }

  private addSubtotalToItem(item: CartItem): CartItemResponse {
    const subtotal = item.product.price.value * item.product.quantity;

    return {
      ...item,
      subtotal,
    };
  }
}
