import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

// OWL CAROUSEL
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.sass';

AOS.init();

export function App() {
  return (
    <>
      <Header />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
