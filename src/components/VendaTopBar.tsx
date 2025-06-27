import { ChevronDown, Search, SlidersHorizontal, XCircle } from "lucide-react";

const canais = ["WhatsApp", "Instagram", "Presencial", "Telefone"];

export default function VendaTopBar({ canal, setCanal, busca, setBusca }) {
  return (
    <div className="mb-4">
      <div className="text-sm text-[#513625] font-semibold mb-1">
        Canal de Venda
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2">
        {/* Dropdown Canal */}
        <div className="relative inline-flex items-center">
          <select
            value={canal}
            onChange={(e) => setCanal(e.target.value)}
            className="appearance-none inline-flex items-center rounded-md border border-[#FFAEBD] bg-white pl-3 pr-6 py-2 text-sm font-semibold text-[#513625] min-w-[120px]"
          >
            {canais.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF5072]" />
        </div>

        {/* Campo Busca */}
        <div className="relative flex items-center w-full max-w-xs bg-white border border-[#FFAEBD] rounded-md px-2">
          <Search className="w-4 h-4 text-[#FF5072] mr-2" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto..."
            className="flex-1 outline-none py-2 bg-transparent"
          />
          {busca && (
            <button onClick={() => setBusca("")} className="ml-2">
              <XCircle className="w-4 h-4 text-[#FF5072]" />
            </button>
          )}
        </div>

        {/* Botão Filtro (decorativo por enquanto) */}
        <button className="ml-2">
          <SlidersHorizontal className="w-5 h-5 text-[#FF5072]" />
        </button>
      </div>
    </div>
  );
}
