import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ importação do Toaster
import './index.css';

import Layout from './components/Layout';
import NovaVenda from './pages/NovaVenda';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import Home from './pages/Home';

import { CarrinhoProvider } from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarrinhoProvider>
      <BrowserRouter>
        <>
          <Toaster
            position="top-center"
            toastOptions={{ duration: 3000 }}
            containerClassName="z-[9999]"
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="nova-venda" element={<NovaVenda />} />
              <Route path="relatorios" element={<Relatorios />} />
              <Route path="configuracoes" element={<Configuracoes />} />
            </Route>
          </Routes>
        </>
      </BrowserRouter>
    </CarrinhoProvider>
  </React.StrictMode>
);
