import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import './App.sass';

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
