import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCarrinho } from '../context/CartContext';

interface ProductCardProps {
  nome: string;
  categoria: string;
  tamanhos: string[];
  coberturas: string[];
}

export default function ProductCard({
  nome,
  categoria,
  tamanhos,
  coberturas,
}: ProductCardProps) {
  // ⚠️ Verificação de dados obrigatórios
  if (!tamanhos || !coberturas || tamanhos.length === 0 || coberturas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs flex flex-col gap-2">
        <div className="w-full h-32 bg-gray-200 rounded-lg" />
        <p className="text-red-500 text-sm text-center mt-2">Produto indisponível.</p>
      </div>
    );
  }

  const { adicionarItem } = useCarrinho();
  const [tamanho, setTamanho] = useState(tamanhos[0]);
  const [cobertura, setCobertura] = useState(coberturas[0]);

  const precos: Record<string, Record<string, number>> = {
    Caseiro: { P: 25, M: 36.9, G: 59.9 },
    Vulcão: { P: 29, M: 44.9, G: 79.9 },
    Mini: { PP: 16.9 },
  };

  const preco = precos[categoria]?.[tamanho] ?? 0;

  const handleAdd = () => {
    adicionarItem({
      nome: `${categoria} de ${nome}`,
      categoria,
      tamanho,
      cobertura,
      quantidade: 1,
      preco,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs flex flex-col gap-2">
      <div className="w-full h-32 bg-gray-200 rounded-lg" />
      <h2 className="text-lg font-bold text-[#513625]">{`${categoria} de ${nome}`}</h2>

      <select
        className="border border-[#FFAEBD] rounded-md p-1 text-center"
        value={tamanho}
        onChange={(e) => setTamanho(e.target.value)}
      >
        {tamanhos.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        className="border border-[#FFAEBD] rounded-md p-1 text-center"
        value={cobertura}
        onChange={(e) => setCobertura(e.target.value)}
      >
        {coberturas.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-semibold text-[#513625]">
          R$ {preco.toFixed(2)}
        </span>
        <button
          onClick={handleAdd}
          className="bg-[#FFAEBD] px-4 py-2 rounded-md"
        >
          <ShoppingBag className="w-5 h-5 text-[#513625]" />
        </button>
      </div>
    </div>
  );
}
