import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ApiProductRepository } from './core/repositories/product';

import { App } from './App';
import { Error, Home, Product, Products } from './pages';

import './index.sass';

const productRepository = new ApiProductRepository();

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home productRepository={productRepository} />,
      },
      {
        path: '/products',
        element: <Products productRepository={productRepository} />,
      },
      {
        path: '/products/:id',
        element: <Product productRepository={productRepository} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
