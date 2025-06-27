import { useState } from "react";
import { X, DollarSign, CreditCard, Landmark, QrCode } from "lucide-react";

type PagamentoModalProps = {
  total: number;
  onFechar: () => void;
};

const PagamentoModal = ({ total, onFechar }: PagamentoModalProps) => {
  const [formaSelecionada, setFormaSelecionada] = useState<string | null>(null);

  const formas = [
    { nome: "Pix", icon: <QrCode size={18} /> },
    { nome: "Débito", icon: <Landmark size={18} /> },
    { nome: "Crédito", icon: <CreditCard size={18} /> },
    { nome: "Dinheiro", icon: <DollarSign size={18} /> },
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative text-[#513625]">
        {/* Botão fechar */}
        <button onClick={onFechar} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          <X />
        </button>

        {/* Total */}
        <div className="text-center mb-4 font-semibold text-lg">
          Total: <span className="font-bold">R$ {total.toFixed(2)}</span>
        </div>

        {/* Opções de pagamento */}
        <div className="flex flex-col gap-2 mb-4">
          {formas.map((forma) => (
            <button
              key={forma.nome}
              onClick={() => setFormaSelecionada(forma.nome)}
              className={`flex items-center justify-start gap-2 border px-4 py-2 rounded transition
                ${
                  formaSelecionada === forma.nome
                    ? "border-[#FF5072] bg-[#fff1f3] font-semibold"
                    : "border-[#FFAEBD] hover:bg-[#fff1f3]"
                }`}
            >
              {forma.icon} {forma.nome}
            </button>
          ))}
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-2">
          <button className="bg-[#FF5072] text-white py-2 rounded-lg font-semibold hover:bg-[#e64565]">
            Pagar
          </button>
          <button className="border border-[#FF5072] text-[#FF5072] py-2 rounded-lg font-semibold hover:bg-[#fff5f7]">
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagamentoModal;
