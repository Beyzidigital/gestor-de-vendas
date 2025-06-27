import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineBarChart,
  AiOutlineSetting,
} from 'react-icons/ai';

import logoDipraia from '../assets/logo-dipraia.svg';
import logoHorizontal from '../assets/logo-horizontal.svg';

type SidebarProps = {
  retraida: boolean;
};

const Sidebar = ({ retraida }: SidebarProps) => {
  const location = useLocation();

  const menus = [
    { name: 'Home', icon: <AiOutlineHome />, path: '/' },
    { name: 'Nova Venda', icon: <AiOutlinePlusCircle />, path: '/nova-venda' },
    { name: 'Relatórios', icon: <AiOutlineBarChart />, path: '/relatorios' },
    { name: 'Configurações', icon: <AiOutlineSetting />, path: '/configuracoes' },
  ];

  return (
    <aside
      className={`h-screen bg-white border-r shadow-md flex flex-col p-4 transition-all duration-300 ${
        retraida ? 'w-16 items-center' : 'w-56'
      }`}
    >
      <div className="mb-6 h-8 flex items-center justify-center">
        {retraida ? (
          <img src={logoDipraia} alt="Dipraia" className="w-10 h-10" />
        ) : (
          <img src={logoHorizontal} alt="Dipraia Horizontal" className="h-15 w-auto max-w-[140px]" />
        )}
      </div>

      <nav className="flex flex-col gap-4">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              location.pathname === menu.path
                ? 'bg-pink-200 text-pink-800 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {menu.icon}
            {!retraida && menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
