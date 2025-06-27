import { useState } from "react";
import ConfiguracaoTabs from "../components/configuracoes/ConfiguracaoTabs";
import Categorias from "../components/configuracoes/Categorias";
import SaboresPrecos from "../components/configuracoes/SaboresPrecos";

const Configuracoes = () => {
  const [abaAtiva, setAbaAtiva] = useState("categorias");

  const renderizaComponente = () => {
    switch (abaAtiva) {
      case "categorias":
        return <Categorias />;
      case "sabores-e-precos":
        return <SaboresPrecos />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#513625]">Configurações</h1>

      <ConfiguracaoTabs abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      <div className="mt-6">{renderizaComponente()}</div>
    </div>
  );
};

export default Configuracoes;
