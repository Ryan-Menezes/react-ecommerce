import { Link } from 'react-router-dom';
import { EntityId } from '@src/domain/entities';
import './style.sass';

export interface ProductCardProps {
  id: EntityId;
  title: string;
  price: number;
  image: string;
}

export function ProductCard({ id, title, price, image }: ProductCardProps) {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Link to={`/products/${id}`} title={title}>
      <div className="product-card">
        <div className="product-card-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">{title}</h3>
          <p className="product-card-price">
            <strong>{formatPrice(price)}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
}
