import { Repository } from '@src/repositories/Repository';
import { CartItem } from '@src/entities/CartItem';
import { EntityId } from '@src/entities/Entity';

export interface CartRepository extends Repository<CartItem> {
  addItem(item: CartItem): void;
  removeItem(id: EntityId): void;
  updateItemQuantity(id: EntityId, quantity: number): void;
  subtotal(id: EntityId): number;
  total(): number;
}
