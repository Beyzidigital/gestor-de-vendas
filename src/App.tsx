import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NovaVenda from './pages/NovaVenda';
import Vendas from './pages/Vendas';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Toaster
        position="top-center"
        toastOptions={{ duration: 3000 }}
        containerClassName="z-[9999]"
      />

      <Routes>
        <Route path="/" element={<NovaVenda />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </div>
  );
}

export default App;
