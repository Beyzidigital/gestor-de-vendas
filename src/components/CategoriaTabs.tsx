type CategoriaTabsProps = {
  categoria: string;
  setCategoria: (categoria: string) => void;
  categorias: string[];
};

const CategoriaTabs = ({ categoria, setCategoria, categorias }: CategoriaTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categorias.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full transition-all ${
            categoria === cat
              ? "bg-[#FFAEBD] text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setCategoria(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoriaTabs;
