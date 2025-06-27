
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editandoValor, setEditandoValor] = useState("");
  const [confirmacaoExclusaoId, setConfirmacaoExclusaoId] = useState<number | null>(null);
  const [textoConfirmacao, setTextoConfirmacao] = useState("");

  const carregarCategorias = async () => {
    try {
      const res = await axios.get("https://api.dipraiadoces.com.br/categorias/listar.php");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const salvarCategoria = async () => {
    if (!novaCategoria.trim()) return;

    try {
      await axios.post("https://api.dipraiadoces.com.br/categorias/adicionar.php", {
        name: novaCategoria,
      });
      toast.success("Categoria adicionada");
      setNovaCategoria("");
      carregarCategorias();
    } catch (error) {
      toast.error("Erro ao salvar nova categoria");
    }
  };

  const salvarEdicao = async (id: number) => {
    if (!editandoValor.trim()) return;

    try {
      await axios.post("https://api.dipraiadoces.com.br/categorias/editar.php", {
        id,
        name: editandoValor,
      });
      toast.success("Editado com sucesso");
      setEditandoId(null);
      setEditandoValor("");
      carregarCategorias();
    } catch (error) {
      toast.error("Erro ao editar categoria");
    }
  };

  const excluirCategoria = async (id: number) => {
    try {
      await axios.post("https://api.dipraiadoces.com.br/categorias/excluir.php", { id });
      toast.success("Excluído com sucesso");
      setConfirmacaoExclusaoId(null);
      setTextoConfirmacao("");
      carregarCategorias();
    } catch (error: any) {
      if (error.response?.status === 409) {
        setConfirmacaoExclusaoId(id);
      } else {
        toast.error("Erro ao excluir categoria");
      }
    }
  };

  const confirmarExclusaoForcada = async (id: number) => {
    if (textoConfirmacao !== "EXCLUIR") {
      toast.error('Digite "EXCLUIR" corretamente para confirmar');
      return;
    }

    try {
      await axios.post("https://api.dipraiadoces.com.br/categorias/excluir.php?forcar=1", { id });
      toast.success("Exclusão forçada realizada");
      setConfirmacaoExclusaoId(null);
      setTextoConfirmacao("");
      carregarCategorias();
    } catch (error) {
      toast.error("Erro na exclusão forçada");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold text-[#513625] mb-4">Categorias</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 w-full"
        />
        <button
          onClick={salvarCategoria}
          className="bg-[#FF5072] text-white px-4 py-1.5 rounded hover:opacity-90"
        >
          Salvar
        </button>
      </div>

      {categorias.map((cat) => (
        <div key={cat.id} className="mb-4">
          {editandoId === cat.id ? (
            <div className="flex items-center gap-2">
              <input
                value={editandoValor}
                onChange={(e) => setEditandoValor(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
              <button
                onClick={() => salvarEdicao(cat.id)}
                className="bg-[#FF5072] text-white px-3 py-1 rounded"
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  setEditandoId(null);
                  setEditandoValor("");
                }}
                className="text-[#513625] hover:text-red-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>{cat.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditandoId(cat.id);
                    setEditandoValor(cat.name);
                  }}
                  className="border border-[#FF5072] rounded p-1"
                >
                  <PencilIcon className="h-5 w-5 text-[#513625]" />
                </button>
                <button
                  onClick={() => excluirCategoria(cat.id)}
                  className="border border-[#FF5072] rounded p-1"
                >
                  <TrashIcon className="h-5 w-5 text-[#513625]" />
                </button>
              </div>
            </div>
          )}

          {confirmacaoExclusaoId === cat.id && (
            <div className="mt-3 bg-red-50 p-3 rounded border border-red-300">
              <p className="text-sm text-red-700 mb-2">
                Existem itens relacionados. Digite <strong>"EXCLUIR"</strong> para confirmar exclusão forçada.
              </p>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder='Digite "EXCLUIR" para confirmar'
                  value={textoConfirmacao}
                  onChange={(e) => setTextoConfirmacao(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 w-full"
                />
                <button
                  onClick={() => confirmarExclusaoForcada(cat.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Confirmar Exclusão
                </button>
                <button
                  onClick={() => {
                    setConfirmacaoExclusaoId(null);
                    setTextoConfirmacao("");
                  }}
                  className="text-[#513625] hover:text-red-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categorias;
