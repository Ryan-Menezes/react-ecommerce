import cartItemObjectRepositoryFixture from './cart-item-object-repository';

const cartItem1 = {
  ...cartItemObjectRepositoryFixture,
  id: '123',
};

const cartItem2 = {
  ...cartItemObjectRepositoryFixture,
  id: '456',
};

export default {
  items: [
    {
      ...cartItem1,
      subtotal: 31,
    },
    {
      ...cartItem2,
      subtotal: 31,
    }
  ],
  total: 62,
};
