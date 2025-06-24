import ProductCard from './ProductCard'

const produtos = [
  { tipo: 'Caseiro', sabor: 'Cenoura' },
  { tipo: 'Caseiro', sabor: 'Chocolate' },
  { tipo: 'Caseiro', sabor: 'Red Velvet' },
  { tipo: 'Caseiro', sabor: 'Laranja' },
  { tipo: 'Caseiro', sabor: 'Limão' },
  { tipo: 'Caseiro', sabor: 'Maracujá' },
  { tipo: 'Caseiro', sabor: 'Mesclado' },
  { tipo: 'Vulcão', sabor: 'Cenoura' },
  { tipo: 'Vulcão', sabor: 'Chocolate' },
  { tipo: 'Vulcão', sabor: 'Red Velvet' },
  { tipo: 'Vulcão', sabor: 'Laranja' },
  { tipo: 'Vulcão', sabor: 'Limão' },
  { tipo: 'Vulcão', sabor: 'Maracujá' },
  { tipo: 'Vulcão', sabor: 'Mesclado' },
  { tipo: 'Mini', sabor: 'Cenoura' },
  { tipo: 'Mini', sabor: 'Chocolate' },
  { tipo: 'Mini', sabor: 'Red Velvet' },
  { tipo: 'Mini', sabor: 'Laranja' },
  { tipo: 'Mini', sabor: 'Limão' },
  { tipo: 'Mini', sabor: 'Maracujá' },
  { tipo: 'Mini', sabor: 'Mesclado' },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {produtos.map((produto, index) => (
        <ProductCard
          key={index}
          tipo={produto.tipo}
          sabor={produto.sabor}
        />
      ))}
    </div>
  )
}
