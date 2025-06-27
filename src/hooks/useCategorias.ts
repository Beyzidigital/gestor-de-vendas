import { useEffect, useState } from "react";
import axios from "axios";

type Categoria = {
  id: number;
  name: string;
};

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const res = await axios.get("https://api.dipraiadoces.com.br/categorias/listar.php");
        setCategorias(res.data);
        if (res.data.length > 0) {
          setCategoriaSelecionada(res.data[0].name);
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    carregarCategorias();
  }, []);

  return {
    categorias: categorias.map((c) => c.name), // retorna como array de string
    categoriaSelecionada,
    setCategoriaSelecionada,
  };
};
