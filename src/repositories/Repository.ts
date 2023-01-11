import { EntityId } from '@src/entities/Entity';

export interface Repository<T> {
  getAll(): T[];
  findById(id: EntityId): T | null;
}
