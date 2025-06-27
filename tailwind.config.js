/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rosaClaro: "#FFE0E6",    // backgrounds, áreas neutras
          rosaMedio: "#FFAEBD",    // elementos de destaque secundário
          rosaEscuro: "#FF5072",   // botões principais, gráficos, CTA
          marrom: "#513625",       // títulos, textos importantes, contraste
          cinzaClaro: "#F2F1F6",   // background de seções, tabelas, divisores
        },
      },
    },
  },
  plugins: [],
}
