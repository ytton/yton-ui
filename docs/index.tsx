import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import 'yton-ui/index.css';
import appRouter from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>
);
