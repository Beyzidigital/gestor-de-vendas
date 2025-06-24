import { useState } from "react";
import ProductCard from "../components/ProductCard";
import VendaTopBar from "../components/VendaTopBar";
import CategoriaTabs from "../components/CategoriaTabs";

const NovaVenda = () => {
  const [canal, setCanal] = useState("WhatsApp");
  const [categoria, setCategoria] = useState("Caseiro");
  const [search, setSearch] = useState("");

  const produtos = [
    { nome: "Cenoura", categoria: "Caseiro" },
    { nome: "Chocolate", categoria: "Caseiro" },
    { nome: "Red Velvet", categoria: "Caseiro" },
    { nome: "Laranja", categoria: "Caseiro" },
    { nome: "Limão", categoria: "Caseiro" },
    { nome: "Maracujá", categoria: "Caseiro" },
    { nome: "Mesclado", categoria: "Caseiro" },

    { nome: "Cenoura", categoria: "Vulcão" },
    { nome: "Chocolate", categoria: "Vulcão" },
    { nome: "Red Velvet", categoria: "Vulcão" },
    { nome: "Laranja", categoria: "Vulcão" },
    { nome: "Limão", categoria: "Vulcão" },
    { nome: "Maracujá", categoria: "Vulcão" },
    { nome: "Mesclado", categoria: "Vulcão" },

    { nome: "Cenoura", categoria: "Mini" },
    { nome: "Chocolate", categoria: "Mini" },
    { nome: "Red Velvet", categoria: "Mini" },
    { nome: "Laranja", categoria: "Mini" },
    { nome: "Limão", categoria: "Mini" },
    { nome: "Maracujá", categoria: "Mini" },
    { nome: "Mesclado", categoria: "Mini" },
  ];

const produtosFiltrados = produtos.filter((p) =>
  search
    ? p.nome.toLowerCase().includes(search.toLowerCase())
    : p.categoria === categoria
);

  return (
    <div className="p-4">
      {/* Topo com seletor de canal e busca */}
      <VendaTopBar
        canal={canal}
        setCanal={setCanal}
        busca={search}
        setBusca={setSearch}
      />

      {/* Abas de categoria */}
      <CategoriaTabs
        categoria={categoria}
        setCategoria={setCategoria}
        categorias={["Caseiro", "Vulcão", "Mini", "Pote", "Naked"]}
      />

      {/* Grid dos produtos filtrados */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtosFiltrados.map((p) => (
            <ProductCard
            key={`${p.nome}-${p.categoria}`}
            nome={`${p.categoria} de ${p.nome}`}
            categoria={p.categoria as any}
          />
        ))}
      </div>
    </div>
  );
};

export default NovaVenda;
