import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { CartItem } from '../CartItem';
import { Load } from '../Load';
import { CartRepository } from '../../domain/repositories';
import { GetAllCartItems, CartItemResponse } from '../../domain/use-cases/cart';
import './style.sass';

export interface CartMenuProps {
  cartRepository: CartRepository;
}

export function CartMenu({ cartRepository }: CartMenuProps) {
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<CartItemResponse[]>([]);
  const getAllCartItems = new GetAllCartItems(cartRepository);

  const getItems = async () => {
    try {
      const { items } = await getAllCartItems.execute();
      setItems(() => items);

      if (items.length === 0) {
        throw new Error('Your cart is empty');
      }
    } catch (e) {
      setError(e as Error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="cart-menu">
      {!error && (
        <>
          <ul className="cart-menu-items">
            {items.map((item) => (
              <CartItem item={item} />
            ))}
          </ul>
          {items.length > 0 && (
            <div className="cart-menu-checkout">
              <button className="btn">
                Checkout
                <FaCheckCircle />
              </button>
            </div>
          )}
        </>
      )}

      {error && (
        <p className="cart-error">
          <strong>{error.message}</strong>
        </p>
      )}

      {!error && items.length === 0 && <Load />}
    </div>
  );
}
