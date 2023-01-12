import { v4 as uuidv4 } from 'uuid';
import { Cache } from '@src/core/protocols/cache';
import { CartItem, EntityId } from '@src/domain/entities';
import { CartRepository } from '@src/domain/repositories';

export class InMemoryCartRepository implements CartRepository {
  public constructor(
    public readonly cache: Cache<EntityId, CartItem>
  ) {}

  public getAll(): CartItem[] {
    return this.cache.getAll();
  }

  public findById(id: EntityId): CartItem | null {
    return this.cache.get(id);
  }

  public addItem(item: CartItem): void {
    const id = uuidv4();
    this.cache.set(id, { id, ...item });
  }

  public removeItem(id: EntityId): void {
    this.cache.remove(id);
  }

  public updateItemQuantity(id: EntityId, quantity: number): void {
    const item = this.findById(id);

    if (item === null) {
      return;
    }

    item.quantity = quantity;
    this.cache.set(id, item);
  }

  public subtotal(id: EntityId): number {
    const item = this.findById(id);

    if (item === null) {
      return 0;
    }

    return item.price.value * item.quantity;
  }

  public total(): number {
    const items = this.getAll();

    return items.reduce((total, item) => {
      return total + (item.price.value * item.quantity);
    }, 0);
  }

  public clear(): void {
    this.cache.clear();
  }
}
