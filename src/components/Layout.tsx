import { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import SideCart from './SideCart';

const Layout = () => {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar retraida={carrinhoAberto} />

      {/* Conteúdo principal */}
      <main
        className={`
          flex-1 overflow-y-auto bg-[#F2F1F6] transition-all duration-300
          ${carrinhoAberto ? 'mr-80' : ''}
        `}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Carrinho lateral */}
      <SideCart
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
        onFecharCarrinho={() => setCarrinhoAberto(false)}
      />
    </div>
  );
};

export default Layout;
