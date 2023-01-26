import { FaMinus, FaPlus } from 'react-icons/fa';
import './style.sass';

export interface InputQuantityProps {
  value: number;
  changeQuantity: (value: number) => void;
}

export function InputQuantity({ value, changeQuantity }: InputQuantityProps) {
  return (
    <>
      <div>
        <label htmlFor="quantity" className="label-quantity">
          Quantidade:
        </label>
        <div className="input-quantity">
          <button className="btn-sub" onClick={() => changeQuantity(value - 1)}>
            <FaMinus />
          </button>

          <input
            type="text"
            name="quantity"
            id="quantity"
            value={value}
            readOnly={true}
          />

          <button
            className="btn-plus"
            onClick={() => changeQuantity(value + 1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
}
