import { EntityId } from '@src/entities';

export interface Repository<T> {
  getAll(): T[];
  findById(id: EntityId): T | null;
}
