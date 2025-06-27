import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

type ItemCarrinho = {
  nome: string;
  categoria: string;
  tamanho: string;
  cobertura: string;
  quantidade: number;
  preco: number;
};

type CarrinhoContextType = {
  carrinho: ItemCarrinho[];
  adicionarItem: (item: ItemCarrinho) => void;
  removerItem: (index: number) => void;
  limparCarrinho: () => void;
  alterarQuantidade: (index: number, novaQtd: number) => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarItem = (item: ItemCarrinho) => {
    setCarrinho((prev) => [...prev, item]);
    toast.success("Item adicionado!");
  };

  const removerItem = (index: number) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== index));
    toast("Item removido!", { icon: "🗑️" });
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    toast("Carrinho limpo!", { icon: "🚫" });
  };

  const alterarQuantidade = (index: number, novaQtd: number) => {
    if (novaQtd <= 0) return; // impede zero ou negativo
    setCarrinho((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantidade: novaQtd } : item))
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, adicionarItem, removerItem, limparCarrinho, alterarQuantidade }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
