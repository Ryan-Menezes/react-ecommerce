import { EntityId } from '@src/domain/entities';

export interface Repository<T> {
  getAll(): Promise<T[]>;
  findById(id: EntityId): Promise<T | null>;
}
