import { Entity } from '@src/domain/entities';

export interface Image extends Entity {
  name: string;
  url: string;
}

export interface Price extends Entity {
  value: number;
}

export interface Product extends Entity {
  name: string;
  description?: string;
  images: Image[];
  prices: Price[];
}
