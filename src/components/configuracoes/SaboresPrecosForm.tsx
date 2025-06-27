import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SaboresPrecosForm = ({ aoCadastrar }: { aoCadastrar: () => void }) => {
  const [nome, setNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);
  const [tamanhos, setTamanhos] = useState<any[]>([]);
  const [coberturas, setCoberturas] = useState<any[]>([]);
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<string[]>([]);
  const [coberturasSelecionadas, setCoberturasSelecionadas] = useState<string[]>([]);
  const [valores, setValores] = useState<Record<string, number>>({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [catRes, tamRes, cobRes] = await Promise.all([
        axios.get("https://api.dipraiadoces.com.br/categories/listar.php"),
        axios.get("https://api.dipraiadoces.com.br/sizes/listar.php"),
        axios.get("https://api.dipraiadoces.com.br/coverages/listar.php"),
      ]);
      setCategorias(catRes.data);
      setTamanhos(tamRes.data);
      setCoberturas(cobRes.data);
    } catch (error) {
      toast.error("Erro ao carregar dados do formulário.");
    }
  };

  const toggleTamanho = (id: string) => {
    setTamanhosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleCobertura = (id: string) => {
    setCoberturasSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const alterarPreco = (tamanhoId: string, coberturaId: string, valor: number) => {
    const chave = `${tamanhoId}|${coberturaId}`;
    setValores((prev) => ({ ...prev, [chave]: valor }));
  };

  const limparFormulario = () => {
    setNome("");
    setCategoriaId("");
    setTamanhosSelecionados([]);
    setCoberturasSelecionadas([]);
    setValores({});
  };

  const enviarFormulario = async () => {
    if (!nome || !categoriaId || tamanhosSelecionados.length === 0 || coberturasSelecionadas.length === 0) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const precos: Record<string, number> = {};
    tamanhosSelecionados.forEach((tamanhoId) => {
      coberturasSelecionadas.forEach((coberturaId) => {
        const chave = `${tamanhoId}|${coberturaId}`;
        precos[chave] = valores[chave] || 0;
      });
    });

    try {
      const resposta = await axios.post("https://api.dipraiadoces.com.br/sabores_precos/adicionar.php", {
        nome,
        categoria_id: categoriaId,
        tamanhos: tamanhosSelecionados,
        coberturas: coberturasSelecionadas,
        precos,
      });

      if (resposta.data?.sucesso) {
        toast.success("Sabor cadastrado com sucesso!");
        limparFormulario();
        aoCadastrar();
      } else {
        toast.error("Erro ao salvar.");
      }
    } catch (erro) {
      toast.error("Falha na comunicação com o servidor.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-[#513625] mb-4">Novo Sabor</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-sm">Sabor</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-sm">Categoria</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Selecione</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-sm">Tamanhos</label>
        <div className="flex flex-wrap gap-2">
          {tamanhos.map((tam) => (
            <label key={tam.id} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={tamanhosSelecionados.includes(tam.id)}
                onChange={() => toggleTamanho(tam.id)}
              />
              {tam.nome}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-sm">Coberturas</label>
        <div className="flex flex-wrap gap-2">
          {coberturas.map((cob) => (
            <label key={cob.id} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={coberturasSelecionadas.includes(cob.id)}
                onChange={() => toggleCobertura(cob.id)}
              />
              {cob.nome}
            </label>
          ))}
        </div>
      </div>

      {tamanhosSelecionados.length > 0 && coberturasSelecionadas.length > 0 && (
        <div className="mb-6">
          <label className="block mb-2 font-medium text-sm">Preços (R$)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tamanhosSelecionados.map((tamId) =>
              coberturasSelecionadas.map((cobId) => {
                const chave = `${tamId}|${cobId}`;
                const tamanhoNome = tamanhos.find((t) => t.id === tamId)?.nome || "";
                const coberturaNome = coberturas.find((c) => c.id === cobId)?.nome || "";
                return (
                  <div key={chave} className="flex items-center gap-2">
                    <span className="text-sm">{tamanhoNome} + {coberturaNome}</span>
                    <input
                      type="number"
                      step="0.01"
                      className="w-24 px-2 py-1 border rounded"
                      value={valores[chave] ?? ""}
                      onChange={(e) => alterarPreco(tamId, cobId, parseFloat(e.target.value))}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      <button
        onClick={enviarFormulario}
        className="bg-[#FF5072] text-white font-medium px-6 py-2 rounded hover:opacity-90"
      >
        Salvar
      </button>
    </div>
  );
};

export default SaboresPrecosForm;
