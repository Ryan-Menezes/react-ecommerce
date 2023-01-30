import { HiShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';
import './style.sass';
import { FormSearch } from '../form';

export function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/">
            <img src="/vite.svg" alt="Ecommerce" />
          </Link>

          <FormSearch />

          <Link to="/">
            <HiShoppingCart />
          </Link>
        </div>
      </header>
      <div className="header-navbar">
        <div className="container">
          <Navbar />
        </div>
      </div>
    </>
  );
}
