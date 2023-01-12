import { Entity } from '@src/entities';
import { Product, Price } from '@src/entities';

export interface CartItem extends Entity {
  product: Product;
  price: Price;
  quantity: number;
}
