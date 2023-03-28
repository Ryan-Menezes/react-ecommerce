import { useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { CartMenu } from '../CartMenu';
import './style.sass';

export function Cart() {
  const [showCart, setShowCart] = useState<boolean>(false);

  const handlerSetShowCart = () => {
    setShowCart((showCart) => !showCart);
  };

  return (
    <>
      {showCart && <CartMenu />}

      <div className="cart" onClick={handlerSetShowCart}>
        <HiShoppingCart />
      </div>
    </>
  );
}
