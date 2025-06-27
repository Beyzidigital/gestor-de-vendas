import { useState, useEffect } from "react";
import { produtos } from "../data/produtos";
import ProductCard from "../components/ProductCard";
import VendaTopBar from "../components/VendaTopBar";
import CategoriaTabs from "../components/CategoriaTabs";
import { useCategorias } from "../hooks/useCategorias";

const NovaVenda = () => {
  const [canal, setCanal] = useState("WhatsApp");
  const [search, setSearch] = useState("");

  const { categorias, categoriaSelecionada, setCategoriaSelecionada } = useCategorias();
  const [categoria, setCategoria] = useState(categoriaSelecionada);

  // Atualiza a categoria local quando a selecionada mudar
  useEffect(() => {
    if (categoriaSelecionada) {
      setCategoria(categoriaSelecionada);
    }
  }, [categoriaSelecionada]);

  // Aplica filtro por nome ou categoria
  const produtosFiltrados = produtos.filter((p) =>
    search
      ? p.nome.toLowerCase().includes(search.toLowerCase())
      : p.categoria === categoria
  );

  return (
    <div className="p-4">
      {/* Topo com busca e canal de venda */}
      <VendaTopBar
        canal={canal}
        setCanal={setCanal}
        busca={search}
        setBusca={setSearch}
      />

      {/* Abas de categorias se houverem categorias carregadas */}
      {categorias.length > 0 && (
        <CategoriaTabs
          categoria={categoria}
          setCategoria={setCategoria}
          categorias={categorias}
        />
      )}

      {/* Grid com cards de produto */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {produtosFiltrados.map((produto) => (
          <ProductCard
            key={`${produto.nome}-${produto.categoria}`}
            nome={produto.nome}
            categoria={produto.categoria}
            tamanhos={produto.tamanhos}
            coberturas={produto.coberturas}
          />
        ))}
      </div>
    </div>
  );
};

export default NovaVenda;
