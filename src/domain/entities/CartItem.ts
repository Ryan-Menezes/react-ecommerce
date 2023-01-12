import { Entity } from '@src/domain/entities';
import { Product, Price } from '@src/domain/entities';

export interface CartItem extends Entity {
  product: Product;
  price: Price;
  quantity: number;
}
