import { produtos } from '../data/produtos';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {produtos.map((produto, index) => (
        <ProductCard
          key={index}
          nome={produto.nome}
          categoria={produto.categoria}
          tamanhos={produto.tamanhos}
          coberturas={produto.coberturas}
        />
      ))}
    </div>
  );
}
