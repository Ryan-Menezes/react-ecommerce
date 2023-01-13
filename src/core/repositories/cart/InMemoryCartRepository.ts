import { UniqueKeyGenerator } from '@src/core/protocols/generator';
import { Cache } from '@src/core/protocols/cache';
import { CartItem, EntityId } from '@src/domain/entities';
import { CartItemData, CartRepository } from '@src/domain/repositories';

export class InMemoryCartRepository implements CartRepository {
  public constructor(
    public readonly cache: Cache<EntityId, CartItem>,
    public readonly keyGenerator: UniqueKeyGenerator
  ) {}

  public async getAll(): Promise<CartItem[]> {
    return this.cache.getAll();
  }

  public async findById(id: EntityId): Promise<CartItem | null> {
    return this.cache.get(id);
  }

  public async addItem(item: CartItemData): Promise<void> {
    const id = item.id ?? (await this.keyGenerator.generate());
    this.cache.set(id, { ...item, id });
  }

  public async removeItem(id: EntityId): Promise<void> {
    this.cache.remove(id);
  }

  public async updateItemQuantity(
    id: EntityId,
    quantity: number
  ): Promise<void> {
    const item = await this.findById(id);

    if (item === null) {
      return;
    }

    this.cache.set(id, {
      ...item,
      product: {
        ...item.product,
        quantity: quantity > 0 ? quantity : 1,
      },
    });
  }

  public async subtotal(id: EntityId): Promise<number> {
    const item = await this.findById(id);

    if (item === null) {
      return 0;
    }

    return item.product.price.value * item.product.quantity;
  }

  public async total(): Promise<number> {
    const items = await this.getAll();

    return items.reduce((total, { product }) => {
      return total + product.price.value * product.quantity;
    }, 0);
  }

  public async clear(): Promise<void> {
    this.cache.clear();
  }
}
