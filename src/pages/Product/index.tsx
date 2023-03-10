import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { useParams } from 'react-router-dom';
import { InputQuantity, AddToCartButton, Load } from '../../components';
import { Product as ProductEntity } from '../../domain/entities';
import { CartRepository, ProductRepository } from '../../domain/repositories';
import { GetProductById } from '../../domain/use-cases/product';
import { AddItemToCart } from '../../domain/use-cases/cart';
import './style.sass';

export interface ProductProps {
  productRepository: ProductRepository;
  cartRepository: CartRepository;
}

export function Product({ productRepository, cartRepository }: ProductProps) {
  const { id } = useParams();
  const [error, setError] = useState<Error | null>(null);
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const formatPrice = (price: number | null): string => {
    if (price === null) {
      return 'Product unavailable';
    }

    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const changeQuantity = (value: number) => {
    if (value > 0) {
      setQuantity(value);
    }
  };

  const getProduct = async () => {
    try {
      const getProductById = new GetProductById(productRepository);
      const product = await getProductById.execute({
        id: id as string,
      });

      setProduct(product);
    } catch (e) {
      setError(e as Error);
    }
  };

  const addItemToCartHandler = async () => {
    console.log('OK');
  };

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 10,
    },
  });

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {error === null && product && (
        <div className="product-show">
          <div className="product-show-images" data-aos="fade-right">
            <img
              src={
                product.images[0]?.url ||
                '/assets/imgs/product-not-available.png'
              }
              alt=""
            />

            <div ref={sliderRef} className="keen-slider thumbnail">
              {product.images.map((image) => (
                <img src={image.url} alt={image.url} />
              ))}
            </div>
          </div>
          <div className="product-show-content" data-aos="fade-left">
            <h1 className="product-show-title">{product.name}</h1>

            <p className="product-show-price">
              {formatPrice(product.price?.value || null)}
            </p>

            {product.description && (
              <p className="product-show-description">{product.description}</p>
            )}

            {product.price && (
              <>
                <InputQuantity
                  value={quantity}
                  changeQuantity={changeQuantity}
                />

                <AddToCartButton handler={addItemToCartHandler} />
              </>
            )}
          </div>
        </div>
      )}

      {error === null && product === null && (
        <section style={{ marginTop: '40px' }}>
          <Load />
        </section>
      )}

      {error && <p className="alert-error">{error.message}</p>}
    </>
  );
}
