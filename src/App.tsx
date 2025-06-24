import { Routes, Route } from 'react-router-dom'
import NovaVenda from './pages/NovaVenda'
import Vendas from './pages/Vendas'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Exemplo: Aqui você pode colocar Header, Menu, Sidebar etc */}
      
      <Routes>
        <Route path="/" element={<NovaVenda />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </div>
  )
}

export default App
