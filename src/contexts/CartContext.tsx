import { createContext } from 'react';
import { CartRepository } from '../domain/repositories';
import { EntityId, CartItem } from '../domain/entities';
import { LocalCache } from '../core/protocols/cache';
import { UuidUniqueKeyGenerator } from '../core/protocols/generator';
import { InMemoryCartRepository } from '../core/repositories/cart';

const cache = new LocalCache<EntityId, CartItem>();
const keyGenerator = new UuidUniqueKeyGenerator();
const cartRepository = new InMemoryCartRepository(cache, keyGenerator);

export type CartContextValue = {
  cartRepository: CartRepository;
};

export const CartContext = createContext<CartContextValue>({
  cartRepository,
});

export type CartProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function CartProvider({ children }: CartProviderProps) {
  return (
    <CartContext.Provider value={{ cartRepository }}>
      {children}
    </CartContext.Provider>
  );
}
