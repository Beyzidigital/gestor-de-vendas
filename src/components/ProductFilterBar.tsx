import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

const canais = ["WhatsApp", "Instagram", "Presencial", "Telefone"];

export default function VendaTopBar({ canal, setCanal, busca, setBusca }) {
  return (
    <div className="mb-4">
      <div className="text-sm text-[#513625] font-semibold mb-1">Canal de Venda</div>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        {/* Dropdown Canal */}
        <div className="relative">
          <select
            value={canal}
            onChange={(e) => setCanal(e.target.value)}
            className="rounded-md border border-[#FFAEBD] bg-white px-3 py-2 font-bold text-[#513625]"
          >
            {canais.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-[#FF5072]" />
        </div>

        {/* Campo Busca */}
        <div className="flex items-center w-full max-w-xs bg-white border border-[#FFAEBD] rounded-md px-2">
          <Search className="w-4 h-4 text-[#FF5072] mr-2" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto..."
            className="flex-1 outline-none py-2 bg-transparent"
          />
        </div>

        {/* Botão Filtro (opcional) */}
        <button className="ml-2">
          <SlidersHorizontal className="w-5 h-5 text-[#FF5072]" />
        </button>
      </div>
    </div>
  );
}
