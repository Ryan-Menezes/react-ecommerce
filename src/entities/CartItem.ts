import { Entity } from './Entity';
import { Product, Price } from './Product';

export interface CartItem extends Entity {
  product: Product;
  price: Price;
  quantity: number;
}
