import { Link, useLocation } from 'react-router-dom'
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineBarChart, AiOutlineSetting } from 'react-icons/ai'

const Sidebar = () => {
  const location = useLocation()

  const menus = [
    { name: 'Home', icon: <AiOutlineHome />, path: '/' },
    { name: 'Nova Venda', icon: <AiOutlinePlusCircle />, path: '/nova-venda' },
    { name: 'Relatórios', icon: <AiOutlineBarChart />, path: '/relatorios' },
    { name: 'Configurações', icon: <AiOutlineSetting />, path: '/configuracoes' }
  ]

  return (
    <aside className="w-56 h-screen bg-white border-r flex flex-col p-4 shadow-md">
      <h1 className="text-xl font-bold mb-6">Gestor de Vendas</h1>
      <nav className="flex flex-col gap-4">
        {menus.map(menu => (
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
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
