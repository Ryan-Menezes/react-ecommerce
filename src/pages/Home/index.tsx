import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';
import { Banner, ProductList } from '../../components';
import './style.sass';

export function Home() {
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
        products={[
          {
            id: '1',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image:
              'https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg',
          },
          {
            id: '2',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image:
              'https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg',
          },
          {
            id: '3',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image: null,
          },
          {
            id: '4',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image:
              'https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg',
          },
          {
            id: '5',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image:
              'https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg',
          },
          {
            id: '6',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image: null,
          },
        ]}
      />
    </>
  );
}
