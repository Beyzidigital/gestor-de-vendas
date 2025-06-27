import { useEffect, useState } from "react";
import { useCarrinho } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import PagamentoModal from "./PagamentoModal";

type SideCartProps = {
  onAbrirCarrinho: () => void;
  onFecharCarrinho: () => void;
};

const SideCart = ({ onAbrirCarrinho, onFecharCarrinho }: SideCartProps) => {
  const { carrinho, removerItem, limparCarrinho, alterarQuantidade } = useCarrinho();
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (carrinho.length > 0) {
      onAbrirCarrinho();
    } else {
      onFecharCarrinho();
    }
  }, [carrinho, onAbrirCarrinho, onFecharCarrinho]);

  if (carrinho.length === 0) return null;

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <>
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 border-l border-gray-200 flex flex-col">
        {/* Topo */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-[#513625]">Carrinho</h2>
          <button
            onClick={limparCarrinho}
            className="text-sm text-[#FF5072] hover:underline"
          >
            Limpar Tudo
          </button>
        </div>

        {/* Lista de itens com scroll */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {carrinho.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <div className="font-semibold text-[#513625]">{item.nome}</div>
                <div className="text-sm text-[#513625]">
                  Tamanho: {item.tamanho} | Cobertura: {item.cobertura}
                </div>
                <div className="text-sm text-[#513625] mb-1">
                  Preço: R$ {item.preco.toFixed(2)}
                </div>

                <div className="flex items-center gap-2 text-[#513625]">
                  <button
                    onClick={() => alterarQuantidade(index, item.quantidade - 1)}
                    className="border px-2 rounded hover:bg-gray-100"
                  >
                    <Minus size={14} />
                  </button>
                  <span>{item.quantidade}</span>
                  <button
                    onClick={() => alterarQuantidade(index, item.quantidade + 1)}
                    className="border px-2 rounded hover:bg-gray-100"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => removerItem(index)}
                    className="ml-auto text-[#FF5072] text-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="text-sm mt-1 font-semibold text-[#513625]">
                  Total: R$ {(item.preco * item.quantidade).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Rodapé fixo */}
        <div className="border-t p-4 bg-white sticky bottom-0">
          <div className="flex justify-between font-bold text-lg text-[#513625] mb-2">
            <span>Total Geral:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setModalAberto(true)}
            className="w-full bg-[#FF5072] text-white py-2 rounded-lg font-semibold hover:bg-[#e64565] transition"
          >
            Pagamento
          </button>
        </div>
      </div>

      {modalAberto && (
        <PagamentoModal total={total} onFechar={() => setModalAberto(false)} />
      )}
    </>
  );
};

export default SideCart;
