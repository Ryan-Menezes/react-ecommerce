import { Link } from 'react-router-dom';
import { EntityId } from '@src/domain/entities';
import './style.sass';

export interface ProductCardProps {
  id: EntityId;
  name: string;
  price: number | null;
  image: string | null;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const formatPrice = (price: number | null): string => {
    if (price === null) {
      return 'Product unavailable';
    }

    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Link to={`/products/${id}`} title={name}>
      <div className="product-card">
        <div className="product-card-image">
          <img
            src={image || '/assets/imgs/product-not-available.png'}
            alt={name}
          />
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">{name}</h3>
          <p className="product-card-price">
            <strong>{formatPrice(price)}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
}
