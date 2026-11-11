/**
 * Items and prices copied from the café's printed menu. Price is in reais;
 * `null` means the price is still to be added.
 */
export type MenuItem = { name: string; description?: string; price: number | null };
export type MenuSection = { id: string; title: string; items: MenuItem[] };

export const menuSections: MenuSection[] = [
  {
    id: "cafes",
    title: "Cafés",
    items: [
      { name: "Espresso Clássico Nespresso", description: "Um café curto, intenso e aromático. Ristretto 25 ml / 40 ml.", price: 8 },
      { name: "Espresso Duplo", description: "Dupla dose de energia, corpo encorpado e final marcante.", price: 15 },
      { name: "Café Drip Coffee", description: "Extração lenta que ressalta notas sutis e delicadas do grão.", price: 9 },
      { name: "Café au Lait", description: "Combinação equilibrada de café forte com leite cremoso vaporizado.", price: 13 },
      { name: "Cappuccino Tradicional", description: "O clássico italiano com perfeita harmonia entre café, leite e espuma aveludada.", price: 14 },
      { name: "Cappuccino com Leite Cond", description: "Versão indulgente do cappuccino, enriquecido com creme de avelã.", price: 14 },
      { name: "Macchiato Italiano", description: "Espresso intenso suavizado por uma delicada mancha de leite.", price: 12 },
      { name: "Chocolate Quente Cremoso", description: "Com leite vaporizado e leve espuma.", price: 14 },
    ],
  },
  {
    id: "chas",
    title: "Chás",
    items: [
      { name: "Bule de Chá 300 ml", description: "Flor de camomila, capim-cidreira, hortelã e canela.", price: 18 },
      {
        name: "Bule de Chá Fada Azul",
        description:
          "A flor fada azul traz sensação de bem-estar. Com gotas de limão, revela sua magia natural, mudando da cor azul para violeta.",
        price: 18,
      },
      { name: "Seleção de Chás Premium Villa Piva", description: "Flores e Frutas, Bom Dia ou Bons Sonhos.", price: 7 },
    ],
  },
  {
    id: "salgados",
    title: "Salgados",
    items: [
      { name: "Croissant Tradicional", description: "Acompanha requeijão e geleia.", price: 18 },
      { name: "Pão de Queijo Mineiro 100 g", price: 7 },
      {
        name: "Empanada Argentina",
        description: "Verificar sabor do dia: frango com requeijão, carne, marguerita, quatro queijos ou vegetariana (berinjela).",
        price: 12,
      },
      { name: "Pão de Batata Recheado", description: "Requeijão.", price: 12 },
      { name: "Esfiha de Carne", price: 12 },
      {
        name: "Tortinha Caseira Integral",
        description: "Frango cremoso, carne com queijo, palmito com azeitonas ou peito de peru com queijo minas.",
        price: 18,
      },
      { name: "Porção de Mini Salgados (6)", description: "Coxinha, bolinha de queijo e croquete de carne.", price: 15 },
    ],
  },
  {
    id: "geladas",
    title: "Bebidas Geladas",
    items: [
      { name: "Suco de Laranja 300 ml", description: "Natural, 100% suco.", price: 12 },
      { name: "Suco de Uva Villa Piva", description: "Garrafa de 300 ml, 100% integral.", price: 17 },
      { name: "Água Mineral 500 ml", price: 6 },
    ],
  },
];

export function formatPrice(price: number | null) {
  if (price === null) return "—";
  return `R$ ${price.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`;
}
