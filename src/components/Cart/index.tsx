import { useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { CartMenu } from '../CartMenu';
import { CartRepository } from '../../domain/repositories';
import './style.sass';

export interface CartProps {
  cartRepository: CartRepository;
}

export function Cart({ cartRepository }: CartProps) {
  const [showCart, setShowCart] = useState<boolean>(false);

  const handlerSetShowCart = () => {
    setShowCart((showCart) => !showCart);
  };

  return (
    <>
      {showCart && <CartMenu cartRepository={cartRepository} />}

      <div className="cart" onClick={handlerSetShowCart}>
        <HiShoppingCart />
      </div>
    </>
  );
}
