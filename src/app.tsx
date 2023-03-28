import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import { CartProvider, ProductProvider } from './contexts';

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

      <ProductProvider>
        <main className="container">
          <Outlet />
        </main>
      </ProductProvider>

      <Footer />
    </CartProvider>
  );
}
