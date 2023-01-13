import { Repository } from '@src/domain/repositories';
import { CartItem, EntityId } from '@src/domain/entities';

export interface CartItemData extends Omit<CartItem, 'id'> {
  id?: EntityId;
}

export interface CartRepository extends Repository<CartItem> {
  addItem(item: CartItemData): Promise<void>;
  removeItem(id: EntityId): Promise<void>;
  updateItemQuantity(id: EntityId, quantity: number): Promise<void>;
  total(): Promise<number>;
  clear(): Promise<void>;
}
