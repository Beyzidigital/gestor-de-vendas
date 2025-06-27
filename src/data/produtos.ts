// src/data/produtos.ts

export type Produto = {
  nome: string;
  categoria: string;
  tamanhos: string[];
  coberturas: string[];
};

export const produtos: Produto[] = [
  // Caseiro
  { nome: "Cenoura", categoria: "Caseiro", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Chocolate", categoria: "Caseiro", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Red Velvet", categoria: "Caseiro", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Laranja", categoria: "Caseiro", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Limão", categoria: "Caseiro", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Maracujá", categoria: "Caseiro", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Mesclado", categoria: "Caseiro", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },

  // Vulcão
  { nome: "Cenoura", categoria: "Vulcão", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Chocolate", categoria: "Vulcão", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Red Velvet", categoria: "Vulcão", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Laranja", categoria: "Vulcão", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Limão", categoria: "Vulcão", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Maracujá", categoria: "Vulcão", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Mesclado", categoria: "Vulcão", tamanhos: ["P", "M", "G"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },

  // Mini
  { nome: "Cenoura", categoria: "Mini", tamanhos: ["PP"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Chocolate", categoria: "Mini", tamanhos: ["PP"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Red Velvet", categoria: "Mini", tamanhos: ["PP"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Laranja", categoria: "Mini", tamanhos: ["PP"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Limão", categoria: "Mini", tamanhos: ["PP"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Maracujá", categoria: "Mini", tamanhos: ["PP"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
  { nome: "Mesclado", categoria: "Mini", tamanhos: ["PP"], coberturas: ["Brigadeiro", "Calda", "De Vó", "Maracujá", "Ninho", "Sem Cobertura"] },
];
