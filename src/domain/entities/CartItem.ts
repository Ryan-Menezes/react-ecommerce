import { Entity, Product, Image, Price } from '../../domain/entities';

export interface CartItemProduct
  extends Pick<Required<Product>, 'id' | 'name'> {
  image?: Image;
  price: Price;
  quantity: number;
}

export interface CartItem extends Entity {
  product: CartItemProduct;
}
