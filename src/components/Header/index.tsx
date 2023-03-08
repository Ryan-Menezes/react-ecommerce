import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Cart } from '../Cart';
import { FormSearch } from '../form';
import { CartRepository } from '../../domain/repositories';
import './style.sass';

export interface HeaderProps {
  cartRepository: CartRepository;
}

export function Header({ cartRepository }: HeaderProps) {
  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/">
            <img src="/assets/imgs/logo.png" alt="Ecommerce" />
          </Link>

          <FormSearch />

          <Cart cartRepository={cartRepository} />
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
