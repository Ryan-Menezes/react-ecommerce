import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';
import './style.sass';

export function Header() {
  return (
    <header class="header">
      <div class="container">
        <Link to="/">
          <img src="/vite.svg" alt="Ecommerce" />
        </Link>

        <Navbar />
      </div>
    </header>
  );
}
