import {
  CacheDefaultKeyType,
  CacheDefaultValueType,
  Cache,
} from '@src/core/protocols/cache';

export class LocalCache<
  K extends CacheDefaultValueType = CacheDefaultKeyType,
  T = CacheDefaultValueType
> implements Cache<K, T>
{
  private readonly items = new Map<K, T>();

  public getAll(): T[] {
    const items = [];

    for (const value of this.items.values()) {
      items.push(value);
    }

    return items;
  }

  public get(key: K): T | null {
    const item = this.items.get(key);

    if (!item) {
      return null;
    }

    return item;
  }

  public set(key: K, value: T): void {
    this.items.set(key, value);
  }

  public remove(key: K): void {
    this.items.delete(key);
  }

  public clear(): void {
    this.items.clear();
  }
}
