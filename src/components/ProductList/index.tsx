import { ProductCard, ProductCardProps } from '../';
import './style.sass';

export interface ProductListProps {
  grid?: number;
  products: ProductCardProps[];
}

export function ProductList({ grid, products }: ProductListProps) {
  return (
    <div className={`product-list grid-${grid || 3}`} data-aos="fade-up">
      {products.map(({ id, name, price, image }) => (
        <ProductCard key={id} id={id} name={name} price={price} image={image} />
      ))}
    </div>
  );
}
