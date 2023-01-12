export type CacheDefaultKeyType = string | number;

export type CacheDefaultValueType = string | number;

export interface Cache<K extends CacheDefaultKeyType = CacheDefaultKeyType, T = CacheDefaultValueType> {
  getAll(): T[];
  get(key: K): T | null;
  set(key: K, value: T): void;
  remove(key: K): void;
  clear(): void;
}
