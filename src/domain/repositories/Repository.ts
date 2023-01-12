import { EntityId } from '@src/domain/entities';

export interface Repository<T> {
  getAll(): T[];
  findById(id: EntityId): T | null;
}
