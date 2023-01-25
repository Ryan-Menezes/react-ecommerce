import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

// KEEN-SLIDER
import 'keen-slider/keen-slider.min.css';

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
