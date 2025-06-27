type CategoriaProdutoTabsProps = {
  categoria: string;
  setCategoria: (categoria: string) => void;
  categorias: string[];
};

const CategoriaProdutoTabs = ({
  categoria,
  setCategoria,
  categorias,
}: CategoriaProdutoTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategoria(cat)}
          className={`px-4 py-2 rounded-full border transition ${
            categoria === cat
              ? "bg-[#FFAEBD] text-[#513625] font-semibold"
              : "bg-white text-[#513625] border-[#FFAEBD] hover:bg-[#FFE0E6]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoriaProdutoTabs;
