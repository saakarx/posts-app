import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './scss/main.scss';
import { loader as homeLoader } from './pages/Home';

import Home from './pages/Home';
import Signin from './pages/Signin';
import AuthProvider from './context/AuthContext';

const router = createBrowserRouter([
  { path: '/', element: <Home />, loader: homeLoader },
  { path: '/signin', element: <Signin /> }
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
