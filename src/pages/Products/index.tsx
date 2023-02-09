import { useState, useEffect } from 'react';
import { ProductList, Load } from '../../components';
import { Product } from '../../domain/entities';
import { ProductRepository } from '../../domain/repositories';
import './style.sass';

export interface ProductsProps {
  productRepository: ProductRepository;
}

export function Products({ productRepository }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    const products = await productRepository.getAll();
    setProducts(products);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="products-page">
      <ProductList
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price?.value || null,
          image: p.images[0]?.url || null,
        }))}
      />

      {products.length === 0 && <Load />}
    </div>
  );
}
