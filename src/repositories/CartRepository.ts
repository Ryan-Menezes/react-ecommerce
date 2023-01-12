import { Repository } from '@src/repositories';
import { CartItem } from '@src/entities';
import { EntityId } from '@src/entities';

export interface CartRepository extends Repository<CartItem> {
  addItem(item: CartItem): void;
  removeItem(id: EntityId): void;
  updateItemQuantity(id: EntityId, quantity: number): void;
  subtotal(id: EntityId): number;
  total(): number;
}
