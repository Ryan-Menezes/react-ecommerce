import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import { CartRepository } from './domain/repositories';
import { CartProvider } from './contexts/CartContext';

// KEEN-SLIDER
import 'keen-slider/keen-slider.min.css';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.sass';

AOS.init();

export function App() {
  return (
    <CartProvider>
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </CartProvider>
  );
}
