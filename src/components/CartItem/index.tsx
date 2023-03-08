import { FaTimes } from 'react-icons/fa';
import { CartItemResponse } from '../../domain/use-cases/cart';
import './style.sass';

export interface CartItemProps {
  item: CartItemResponse;
}

export function CartItem({ item }: CartItemProps) {
  return (
    <li>
      <div>
        <img src={item.product.image?.url || ''} alt={item.product.name} />
        <span>{item.product.name}</span>
        <span>X</span>
        <span>{item.product.quantity}</span>
      </div>
      <span className="cart-menu-items-close">
        <FaTimes />
      </span>
    </li>
  );
}
