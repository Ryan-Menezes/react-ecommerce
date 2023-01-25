import { useKeenSlider } from 'keen-slider/react';
import { Banner, ProductCard } from '../../components';
import './style.sass';

export function Home() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 48,
      },
    },
    [],
  );

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

      <div className="product-list" data-aos="fade-up">
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
