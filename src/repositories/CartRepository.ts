import { Repository } from './Repository';
import { CartItem } from '../entities/CartItem';
import { EntityId } from '../entities/Entity';

export interface CartRepository extends Repository<CartItem> {
  addItem(item: CartItem): void;
  removeItem(id: EntityId): void;
  updateItemQuantity(id: EntityId, quantity: number): void;
  subtotal(id: EntityId): number;
  total(): number;
}
