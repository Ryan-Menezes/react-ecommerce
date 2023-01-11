import { Entity } from '@src/entities/Entity';
import { Product, Price } from '@src/entities/Product';

export interface CartItem extends Entity {
  product: Product;
  price: Price;
  quantity: number;
}
