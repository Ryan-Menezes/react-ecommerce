import { Entity } from '@src/domain/entities';

export interface Image {
  readonly name: string;
  readonly url: string;
}

export interface Price extends Entity {
  readonly value: number;
}

export interface MetaData {
  [key: string]: string | number;
}

export interface Product extends Entity {
  readonly name: string;
  readonly description?: string;
  readonly defaultPrice?: Price;
  readonly images: Image[];
  readonly prices: Price[];
  readonly metadata: MetaData;
}
