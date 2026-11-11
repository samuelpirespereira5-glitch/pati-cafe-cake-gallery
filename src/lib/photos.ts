import boloChocolate from "@/assets/fotos/bolo-chocolate-castanhas.png.asset.json";
import cappuccinoBandeja from "@/assets/fotos/cappuccino-bandeja.png.asset.json";
import cappuccinoCanela from "@/assets/fotos/cappuccino-canela.png.asset.json";
import vitrineDoces from "@/assets/fotos/vitrine-doces.png.asset.json";
import fatiaBolo from "@/assets/fotos/fatia-bolo-creme.png.asset.json";
import ambiente from "@/assets/fotos/ambiente-prateleiras.png.asset.json";
import vitrineSalgados from "@/assets/fotos/vitrine-salgados.png.asset.json";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: "Bolos" | "Cafés" | "Vitrine" | "Ambiente";
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
} satisfies Record<string, Photo>;

/** Gallery order: all seven photographs, none left out. */
export const galleryPhotos: Photo[] = [
  photos.boloChocolate,
  photos.cappuccinoBandeja,
  photos.vitrineDoces,
  photos.ambiente,
  photos.fatiaBolo,
  photos.cappuccinoCanela,
  photos.vitrineSalgados,
];
