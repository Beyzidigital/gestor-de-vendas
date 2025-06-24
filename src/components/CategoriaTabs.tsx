export default function CategoriaTabs({ categoria, setCategoria, categorias }) {
  return (
    <div className="flex gap-2 mt-2">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategoria(cat)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            categoria === cat
              ? "bg-[#FFAEBD] text-[#513625]"
              : "bg-[#FFE0E6] text-[#513625]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
