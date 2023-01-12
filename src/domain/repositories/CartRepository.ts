import { Repository } from '@src/domain/repositories';
import { CartItem } from '@src/domain/entities';
import { EntityId } from '@src/domain/entities';

export interface CartRepository extends Repository<CartItem> {
  addItem(item: CartItem): Promise<void>;
  removeItem(id: EntityId): Promise<void>;
  updateItemQuantity(id: EntityId, quantity: number): Promise<void>;
  subtotal(id: EntityId): Promise<number>;
  total(): Promise<number>;
  clear(): Promise<void>;
}
