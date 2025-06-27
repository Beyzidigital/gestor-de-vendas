import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Tipo dos dados de sabor
type Sabor = {
  id: number;
  name: string;
};

const Sabores = () => {
  const [sabores, setSabores] = useState<Sabor[]>([]);
  const [novoSabor, setNovoSabor] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editandoValor, setEditandoValor] = useState("");
  const [confirmacaoExclusaoId, setConfirmacaoExclusaoId] = useState<number | null>(null);
  const [textoConfirmacao, setTextoConfirmacao] = useState("");

  const carregarSabores = async () => {
    try {
      const res = await axios.get("https://api.dipraiadoces.com.br/produtos/listar.php");
      setSabores(res.data);
    } catch (error) {
      console.error("Erro ao carregar sabores:", error);
    }
  };

  useEffect(() => {
    carregarSabores();
  }, []);

  const salvarSabor = async () => {
    if (!novoSabor.trim()) return;

    try {
      await axios.post("https://api.dipraiadoces.com.br/produtos/adicionar.php", {
        name: novoSabor,
      });
      toast.success("Sabor adicionado com sucesso");
      setNovoSabor("");
      carregarSabores();
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Esse sabor já está cadastrado");
      } else {
        toast.error("Erro ao salvar novo sabor");
      }
    }
  };

  const salvarEdicao = async (id: number) => {
    if (!editandoValor.trim()) return;

    try {
      await axios.post("https://api.dipraiadoces.com.br/produtos/editar.php", {
        id,
        name: editandoValor,
      });
      toast.success("Sabor editado com sucesso");
      setEditandoId(null);
      setEditandoValor("");
      carregarSabores();
    } catch (error) {
      toast.error("Erro ao editar sabor");
    }
  };

  const excluirSabor = async (id: number) => {
    try {
      await axios.post("https://api.dipraiadoces.com.br/produtos/excluir.php", { id });
      toast.success("Sabor excluído");
      setConfirmacaoExclusaoId(null);
      setTextoConfirmacao("");
      carregarSabores();
    } catch (error: any) {
      if (error.response?.status === 409) {
        setConfirmacaoExclusaoId(id);
      } else {
        toast.error("Erro ao excluir sabor");
      }
    }
  };

  const confirmarExclusao = async (id: number) => {
    if (textoConfirmacao !== "EXCLUIR") {
      toast.error('Digite "EXCLUIR" corretamente para confirmar');
      return;
    }

    try {
      await axios.post("https://api.dipraiadoces.com.br/produtos/excluir.php?forcar=1", { id });
      toast.success("Sabor excluído com sucesso");
      setConfirmacaoExclusaoId(null);
      setTextoConfirmacao("");
      carregarSabores();
    } catch (error) {
      toast.error("Erro ao excluir sabor");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold text-[#513625] mb-4">Sabores</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Novo sabor"
          value={novoSabor}
          onChange={(e) => setNovoSabor(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 w-full"
        />
        <button
          onClick={salvarSabor}
          className="bg-[#FF5072] text-white px-4 py-1.5 rounded hover:opacity-90"
        >
          Salvar
        </button>
      </div>

      {sabores.map((sabor) => (
        <div key={sabor.id} className="mb-4">
          {editandoId === sabor.id ? (
            <div className="flex items-center gap-2">
              <input
                value={editandoValor}
                onChange={(e) => setEditandoValor(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
              <button
                onClick={() => salvarEdicao(sabor.id)}
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
              <span>{sabor.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditandoId(sabor.id);
                    setEditandoValor(sabor.name);
                  }}
                  className="border border-[#FF5072] rounded p-1"
                >
                  <PencilIcon className="h-5 w-5 text-[#513625]" />
                </button>
                <button
                  onClick={() => excluirSabor(sabor.id)}
                  className="border border-[#FF5072] rounded p-1"
                >
                  <TrashIcon className="h-5 w-5 text-[#513625]" />
                </button>
              </div>
            </div>
          )}

          {confirmacaoExclusaoId === sabor.id && (
            <div className="mt-3 bg-red-50 p-3 rounded border border-red-300">
              <p className="text-sm text-red-700 mb-2">
                Existem itens relacionados. Digite <strong>"EXCLUIR"</strong> para confirmar.
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
                  onClick={() => confirmarExclusao(sabor.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Confirmar
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

export default Sabores;
