import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Cart } from '../Cart';
import { FormSearch } from '../form';
import './style.sass';

export function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/">
            <img src="/assets/imgs/logo.png" alt="Ecommerce" />
          </Link>

          <FormSearch />

          <Cart />
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
