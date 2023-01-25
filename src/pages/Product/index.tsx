import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from 'keen-slider/react';
import { HiShoppingCart } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import './style.sass';

export function Product() {
  const { id } = useParams();

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 10,
    },
  });

  return (
    <>
      <div className="product-show">
        <div className="product-show-images" data-aos="fade-right">
          <img
            src="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
            alt=""
          />

          <div ref={sliderRef} className="keen-slider thumbnail">
            <img
              className="keen-slider__slide"
              src="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
              alt=""
            />
            <img
              className="keen-slider__slide"
              src="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
              alt=""
            />
            <img
              className="keen-slider__slide"
              src="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
              alt=""
            />
            <img
              className="keen-slider__slide"
              src="https://a-static.mlcdn.com.br/800x560/iphone-11-apple-64gb-preto-61-12mp-ios/magazineluiza/155610500/2815c001fcdff11766fcb266dca62daf.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="product-show-content" data-aos="fade-left">
          <h1 className="product-show-title">
            iPhone 11 Apple 64GB Preto 6,1” 12MP iOS
          </h1>
          <p className="product-show-price">R$ 3.161,99</p>
          <p className="product-show-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            praesentium officia consequatur ipsam eveniet at provident!
            Molestias quis cum rem temporibus beatae ullam consequuntur neque
            dolores accusantium, laboriosam repellendus quasi!
          </p>
          <button className="btn">
            Add to cart <HiShoppingCart />
          </button>
        </div>
      </div>
    </>
  );
}
