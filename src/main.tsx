import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { render } from 'preact';
import { App } from './App';
import { Home, Product, Products } from './pages';
import './index.sass';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/:id',
        element: <Product />,
      },
    ],
  },
]);

render(
  <RouterProvider router={router} />,
  document.getElementById('app') as HTMLElement
);
