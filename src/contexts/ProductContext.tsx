import { createContext } from 'react';
import { ProductRepository } from '../domain/repositories';
import { ApiProductRepository } from '../core/repositories/product';

const productRepository = new ApiProductRepository();

export type ProductContextValue = {
  productRepository: ProductRepository;
};

export const ProductContext = createContext<ProductContextValue>({
  productRepository,
});

export type ProductProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function ProductProvider({ children }: ProductProviderProps) {
  return (
    <ProductContext.Provider value={{ productRepository }}>
      {children}
    </ProductContext.Provider>
  );
}
