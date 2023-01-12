import { Entity } from '@src/domain/entities';
import { Product, Price } from '@src/domain/entities';

export interface CartItem extends Entity {
  readonly product: Product;
  readonly price: Price;
  quantity: number;
}
