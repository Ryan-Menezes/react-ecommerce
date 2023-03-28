import { useState, useEffect, useContext } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Banner, ProductList, Load } from '../../components';
import { Product } from '../../domain/entities';
import { ProductContext, ProductContextValue } from '../../contexts';
import './style.sass';

export function Home() {
  const { productRepository } = useContext<ProductContextValue>(ProductContext);
  const [products, setProducts] = useState<Product[]>([]);

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 20,
      },
    },
    []
  );

  const getAllProducts = async () => {
    const products = await productRepository.getAll();
    setProducts(products);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide">
          <Banner
            title="Lorem ipsum dolor sit amet consectetur."
            description="Qui omnis doloremque quam quidem pariatur consequatur sint fuga odio totam labore! Accusamus doloremque cumque quibusdam."
            image="/assets/imgs/shoe-banner.png"
          />
        </div>
        <div className="keen-slider__slide">
          <Banner
            title="Lorem ipsum dolor sit amet consectetur."
            description="Qui omnis doloremque quam quidem pariatur consequatur sint fuga odio totam labore! Accusamus doloremque cumque quibusdam."
            image="/assets/imgs/shoe-banner.png"
          />
        </div>
      </div>

      <h2 className="page-title">Our products</h2>

      <ProductList
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price?.value || null,
          image: p.images[0]?.url || null,
        }))}
      />

      {products.length === 0 && <Load />}
    </>
  );
}
