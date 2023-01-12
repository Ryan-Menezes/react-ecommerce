import { Entity } from '@src/domain/entities';

export interface Image extends Entity {
  readonly name: string;
  readonly url: string;
}

export interface Price extends Entity {
  readonly value: number;
}

export interface Product extends Entity {
  readonly name: string;
  readonly description?: string;
  readonly images: Image[];
  readonly prices: Price[];
}
