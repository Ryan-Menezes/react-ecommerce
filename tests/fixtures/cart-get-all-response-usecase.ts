import cartItemObjectRepository from './cart-item-object-repository';

const cartItem1 = {
  ...cartItemObjectRepository,
  id: '123',
};

const cartItem2 = {
  ...cartItemObjectRepository,
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
