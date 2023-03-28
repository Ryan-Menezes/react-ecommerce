import { HiShoppingCart } from 'react-icons/hi';
import './style.sass';

export interface AddToCartButtonProps {
  text?: string;
  handler: () => Promise<void>;
}

export function AddToCartButton({ text, handler }: AddToCartButtonProps) {
  const handlerClick = async () => {
    await handler();
  };

  return (
    <button className="btn" onClick={handlerClick}>
      {text ?? 'Add to cart'} <HiShoppingCart />
    </button>
  );
}
