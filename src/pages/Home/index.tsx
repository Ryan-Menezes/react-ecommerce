import { Banner, ProductCard } from '../../components';
import './style.sass';

export function Home() {
  return (
    <>
      <Banner
        title="Lorem ipsum dolor sit amet consectetur."
        description="Qui omnis doloremque quam quidem pariatur consequatur sint fuga odio totam labore! Accusamus doloremque cumque quibusdam."
        image="/assets/imgs/shoe-banner.png"
      />

      <div className="product-list">
        <ProductCard
          id="1"
          title="iPhone 11 Apple 64GB Preto 6,1” 12MP iOS"
          price={3161.99}
          image="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
        />

        <ProductCard
          id="2"
          title="iPhone 11 Apple 64GB Preto 6,1” 12MP iOS"
          price={3161.99}
          image="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
        />

        <ProductCard
          id="3"
          title="iPhone 11 Apple 64GB Preto 6,1” 12MP iOS"
          price={3161.99}
          image="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
        />
      </div>
    </>
  );
}
