import { describe, expect, it } from "vitest";
import { formatPrice, menuSections } from "@/lib/menu";
import { galleryPhotos } from "@/lib/photos";

const price = (name: string) =>
  menuSections.flatMap((s) => s.items).find((i) => i.name === name)?.price;

describe("Cardápio da Pati Café Boutique", () => {
  it("espresso clássico custa R$ 8", () => expect(price("Espresso Clássico Nespresso")).toBe(8));
  it("cappuccino tradicional custa R$ 14", () => expect(price("Cappuccino Tradicional")).toBe(14));
  it("croissant tradicional custa R$ 18", () => expect(price("Croissant Tradicional")).toBe(18));
  it("água mineral custa R$ 6", () => expect(price("Água Mineral 500 ml")).toBe(6));
  it("formata preço em reais", () => expect(formatPrice(12)).toBe("R$ 12"));
});

describe("Galeria", () => {
  it("usa todas as 7 fotos enviadas, sem repetir", () => {
    expect(new Set(galleryPhotos.map((p) => p.src)).size).toBe(7);
  });
});
