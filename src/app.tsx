import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import { CartRepository } from './domain/repositories';

// KEEN-SLIDER
import 'keen-slider/keen-slider.min.css';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.sass';

AOS.init();

export interface AppProps {
  cartRepository: CartRepository;
}

export function App({ cartRepository }: AppProps) {
  return (
    <>
      <Header cartRepository={cartRepository} />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
