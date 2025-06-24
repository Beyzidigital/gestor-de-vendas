import { useState } from "react";
import { ShoppingBag } from "lucide-react"; // outlined

type Tamanho = "P" | "M" | "G" | "PP";
type Categoria = "Caseiro" | "Vulcão" | "Mini";

interface ProdutoProps {
  nome: string;
  categoria: Categoria;
}

const tamanhosDisponiveis: Record<Categoria, Tamanho[]> = {
  Caseiro: ["P", "M", "G"],
  Vulcão: ["P", "M", "G"],
  Mini: ["PP"],
};

const precos: Record<Categoria, Record<Tamanho, number>> = {
  Caseiro: { P: 25, M: 36.9, G: 59.9 },
  Vulcão: { P: 29, M: 44.9, G: 79.9 },
  Mini: { PP: 16.9 },
};

const coberturas = [
  "Brigadeiro",
  "Calda",
  "De Vó",
  "Maracujá",
  "Ninho",
  "Sem Cobertura",
];

export default function ProductCard({ nome, categoria }: ProdutoProps) {
  const tamanhos = tamanhosDisponiveis[categoria];
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<Tamanho>(tamanhos[0]);
  const [coberturaSelecionada, setCoberturaSelecionada] = useState(coberturas[0]);

  const preco = precos[categoria][tamanhoSelecionado];

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-xs flex flex-col gap-2">
      <div className="w-full h-32 bg-gray-300 rounded-lg" />
      <h2 className="text-lg font-bold text-[#513625]">{nome}</h2>

      <select
        className="border border-[#FFAEBD] rounded-md p-1 text-center"
        value={tamanhoSelecionado}
        onChange={(e) => setTamanhoSelecionado(e.target.value as Tamanho)}
      >
        {tamanhos.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        className="border border-[#FFAEBD] rounded-md p-1 text-center"
        value={coberturaSelecionada}
        onChange={(e) => setCoberturaSelecionada(e.target.value)}
      >
        {coberturas.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex justify-between items-center mt-2">
        <span className="text-xl font-semibold text-[#513625]">R$ {preco.toFixed(2)}</span>
        <button className="bg-[#FFAEBD] px-4 py-2 rounded-md">
          <ShoppingBag className="w-5 h-5 text-[#513625]" />
        </button>
      </div>
    </div>
  );
}
