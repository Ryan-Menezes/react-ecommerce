import { Repository } from '@src/domain/repositories';
import { CartItem } from '@src/domain/entities';
import { EntityId } from '@src/domain/entities';

export interface CartRepository extends Repository<CartItem> {
  addItem(item: CartItem): void;
  removeItem(id: EntityId): void;
  updateItemQuantity(id: EntityId, quantity: number): void;
  subtotal(id: EntityId): number;
  total(): number;
}
