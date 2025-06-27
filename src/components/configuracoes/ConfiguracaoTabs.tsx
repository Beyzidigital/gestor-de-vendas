type ConfiguracaoTabsProps = {
  abaAtiva: string;
  setAbaAtiva: (aba: string) => void;
};

const tabs = [
  "categorias",
  "sabores-e-precos",
  "tamanhos",
  "coberturas",
  "preços",
  "canais de venda",
  "formas de pagamento",
];

const labels: { [key: string]: string } = {
  categorias: "Categorias",
  "sabores-e-precos": "Sabores e Preços",
  tamanhos: "Tamanhos",
  coberturas: "Coberturas",
  preços: "Preços",
  "canais de venda": "Canais de Venda",
  "formas de pagamento": "Formas de Pagamento",
};

const ConfiguracaoTabs = ({ abaAtiva, setAbaAtiva }: ConfiguracaoTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-full transition-all ${
            abaAtiva === tab
              ? "bg-[#FFAEBD] text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
          onClick={() => setAbaAtiva(tab)}
        >
          {labels[tab]}
        </button>
      ))}
    </div>
  );
};

export default ConfiguracaoTabs;
