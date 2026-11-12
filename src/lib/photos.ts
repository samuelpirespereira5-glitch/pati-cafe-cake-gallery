import boloChocolate from "@/assets/fotos/bolo-chocolate-castanhas.png.asset.json";
import cappuccinoBandeja from "@/assets/fotos/cappuccino-bandeja.png.asset.json";
import cappuccinoCanela from "@/assets/fotos/cappuccino-canela.png.asset.json";
import vitrineDoces from "@/assets/fotos/vitrine-doces.png.asset.json";
import fatiaBolo from "@/assets/fotos/fatia-bolo-creme.png.asset.json";
import ambiente from "@/assets/fotos/ambiente-prateleiras.png.asset.json";
import vitrineSalgados from "@/assets/fotos/vitrine-salgados.png.asset.json";
import cookieSorvete from "@/assets/fotos/cookie-com-sorvete.png.asset.json";
import espaguete from "@/assets/fotos/espaguete-artesanal.png.asset.json";
import brownieSorvete from "@/assets/fotos/brownie-com-sorvete.png.asset.json";
import baguete from "@/assets/fotos/baguete-com-chips.png.asset.json";
import prensaBoloVulcao from "@/assets/fotos/prensa-francesa-bolo-vulcao.png.asset.json";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: "Bolos" | "Sobremesas" | "Cafés" | "Pratos" | "Vitrine" | "Ambiente";
};

/** The café's own photographs. Width/height are the real pixel sizes, used to keep proportions. */
export const photos = {
  boloChocolate: {
    id: "bolo-chocolate",
    src: boloChocolate.url,
    width: 379,
    height: 467,
    alt: "Fatia de bolo de chocolate com cobertura de castanhas, servida em frigideira de ferro com mamão, morangos e uma margarida",
    caption: "Bolo de chocolate com castanhas e frutas frescas",
    category: "Bolos",
  },
  cappuccinoBandeja: {
    id: "cappuccino-bandeja",
    src: cappuccinoBandeja.url,
    width: 506,
    height: 397,
    alt: "Café com espuma de leite e canela em copo de vidro duplo, ao lado de um quitute em prato branco rendado sobre bandeja de madeira",
    caption: "Café com espuma de leite servido na bandeja",
    category: "Cafés",
  },
  cappuccinoCanela: {
    id: "cappuccino-canela",
    src: cappuccinoCanela.url,
    width: 378,
    height: 471,
    alt: "Café cremoso com espuma de leite e canela em copo de vidro, sobre porta-copos de madeira em formato de coração",
    caption: "Espuma aveludada e um toque de canela",
    category: "Cafés",
  },
  vitrineDoces: {
    id: "vitrine-doces",
    src: vitrineDoces.url,
    width: 669,
    height: 393,
    alt: "Vitrine com donuts coloridos, docinhos, fatias de bolo de chocolate e torta de frutas vermelhas",
    caption: "Vitrine de doces, donuts e fatias de bolo",
    category: "Vitrine",
  },
  fatiaBolo: {
    id: "fatia-bolo",
    src: fatiaBolo.url,
    width: 509,
    height: 407,
    alt: "Fatia de bolo artesanal com cobertura cremosa e coco, em prato branco com brotos verdes",
    caption: "Fatia de bolo artesanal com calda cremosa",
    category: "Bolos",
  },
  ambiente: {
    id: "ambiente",
    src: ambiente.url,
    width: 283,
    height: 408,
    alt: "Mesa posta com café e bolinho em frente às prateleiras iluminadas da Pati Café Boutique, com tijolinhos e objetos decorativos",
    caption: "Prateleiras, tijolinhos e luz aconchegante",
    category: "Ambiente",
  },
  vitrineSalgados: {
    id: "vitrine-salgados",
    src: vitrineSalgados.url,
    width: 283,
    height: 407,
    alt: "Vitrine aquecida com croissant, empanadas e salgados assados",
    caption: "Vitrine de salgados: croissant e empanadas",
    category: "Vitrine",
  },
  cookieSorvete: {
    id: "cookie-sorvete",
    src: cookieSorvete.url,
    width: 422,
    height: 559,
    alt: "Cookie artesanal recheado, servido com bola de sorvete e calda, em prato com flor decorativa",
    caption: "Cookie recheado com sorvete e calda",
    category: "Sobremesas",
  },
  brownieSorvete: {
    id: "brownie-sorvete",
    src: brownieSorvete.url,
    width: 437,
    height: 539,
    alt: "Brownie de chocolate com bola de sorvete, morangos, kiwi e frutas vermelhas em prato branco",
    caption: "Brownie com sorvete e frutas frescas",
    category: "Sobremesas",
  },
  espaguete: {
    id: "espaguete",
    src: espaguete.url,
    width: 564,
    height: 564,
    alt: "Prato de espaguete artesanal com molho, queijo ralado e salada verde ao lado",
    caption: "Espaguete artesanal com salada",
    category: "Pratos",
  },
  baguete: {
    id: "baguete",
    src: baguete.url,
    width: 574,
    height: 567,
    alt: "Baguete recheada com carne desfiada servida com chips artesanais em tábua de madeira",
    caption: "Baguete de carne desfiada com chips",
    category: "Pratos",
  },
  prensaBoloVulcao: {
    id: "prensa-bolo-vulcao",
    src: prensaBoloVulcao.url,
    width: 321,
    height: 538,
    alt: "Café na prensa francesa ao lado de um bolo vulcão de chocolate com calda escorrendo",
    caption: "Café na prensa francesa e bolo vulcão",
    category: "Cafés",
  },
} satisfies Record<string, Photo>;

/** Gallery order: every photograph the café sent, none left out. */
export const galleryPhotos: Photo[] = [
  photos.boloChocolate,
  photos.cappuccinoBandeja,
  photos.cookieSorvete,
  photos.vitrineDoces,
  photos.espaguete,
  photos.ambiente,
  photos.prensaBoloVulcao,
  photos.fatiaBolo,
  photos.baguete,
  photos.cappuccinoCanela,
  photos.brownieSorvete,
  photos.vitrineSalgados,
];
