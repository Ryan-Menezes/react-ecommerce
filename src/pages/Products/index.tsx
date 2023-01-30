import { ProductList } from '../../components';
import './style.sass';

export function Products() {
  return (
    <div className="products-page">
      <ProductList
        grid={3}
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
            image: null,
          },
          {
            id: '5',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image: null,
          },
          {
            id: '6',
            name: 'iPhone 11 Apple 64GB Preto 6,1” 12MP iOS',
            price: 3161.99,
            image: null,
          },
        ]}
      />
    </div>
  );
}
