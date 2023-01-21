import { HiShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './style.sass';

export function Navbar() {
  return (
    <nav class="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/">
            <HiShoppingCart />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
