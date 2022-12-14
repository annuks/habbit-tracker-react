import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ShopProvider } from './provider/ShopProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopProvider>  
    <App />
  </ShopProvider>
);

