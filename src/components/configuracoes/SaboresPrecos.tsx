import { useEffect, useState } from "react";
import axios from "axios";
import SaboresPrecosForm from "../../components/configuracoes/SaboresPrecosForm";
import { toast } from "react-hot-toast";

type SaborPreco = {
  id: number;
  nome: string;
  categoria: string;
  tamanho: string;
  cobertura: string;
  preco: number;
};

export default function SaboresPrecos() {
  const [sabores, setSabores] = useState<SaborPreco[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarSaboresPrecos = async () => {
    try {
      const resposta = await axios.get("https://api.dipraiadoces.com.br/sabores_precos/listar.php");
      setSabores(resposta.data);
    } catch (erro) {
      toast.error("Erro ao carregar sabores e preços.");
      console.error("Erro ao carregar sabores e preços:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarSaboresPrecos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-[#513625]">Sabores e Preços</h2>

      {carregando ? (
        <p>Carregando...</p>
      ) : sabores.length === 0 ? (
        <p>Nenhum sabor cadastrado.</p>
      ) : (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[#FFAEBD] text-[#513625]">
              <tr>
                <th className="px-4 py-2 text-left">Sabor</th>
                <th className="px-4 py-2 text-left">Categoria</th>
                <th className="px-4 py-2 text-left">Tamanho</th>
                <th className="px-4 py-2 text-left">Cobertura</th>
                <th className="px-4 py-2 text-left">Preço</th>
              </tr>
            </thead>
            <tbody>
              {sabores.map((item) => (
                <tr key={item.id} className="border-t hover:bg-[#FFE0E6]">
                  <td className="px-4 py-2">{item.nome}</td>
                  <td className="px-4 py-2">{item.categoria}</td>
                  <td className="px-4 py-2">{item.tamanho}</td>
                  <td className="px-4 py-2">{item.cobertura}</td>
                  <td className="px-4 py-2">R$ {item.preco.toFixed(2).replace(".", ",")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulário de cadastro */}
      <div className="mt-8">
        <SaboresPrecosForm aoCadastrar={carregarSaboresPrecos} />
      </div>
    </div>
  );
}
