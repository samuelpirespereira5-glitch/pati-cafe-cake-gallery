import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { VisitBand } from "@/components/site/VisitBand";
import { galleryPhotos, type Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de fotos — Pati Café Boutique" },
      {
        name: "description",
        content:
          "Fotos reais da Pati Café Boutique: bolo de chocolate com castanhas, fatias de bolo, cafés com espuma de leite, vitrines e ambiente.",
      },
      { property: "og:title", content: "Galeria — Pati Café Boutique" },
      {
        property: "og:description",
        content: "Bolos, cafés, doces, vitrines e o ambiente da Pati Café Boutique em fotos reais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GaleriaPage,
});

const filters: ("Todas" | Photo["category"])[] = [
  "Todas",
  "Bolos",
  "Sobremesas",
  "Cafés",
  "Pratos",
  "Vitrine",
  "Ambiente",
];

function GaleriaPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todas");
  const items = filter === "Todas" ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);

  return (
    <>
      <section className="bg-warm pb-16 pt-36 md:pt-44">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Galeria" title={<>Os nossos <em>momentos</em></>}>
              Bolos com cobertura de castanhas, fatias artesanais, cafés com espuma de leite, vitrines e
              o aconchego do nosso espaço. Toque em uma foto para ampliar.
            </SectionHeading>
          </Reveal>
          <div role="tablist" aria-label="Filtrar fotos" className="mt-12 flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm tracking-wide transition-all duration-300",
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-primary hover:border-gold",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8 md:pb-32">
        <PhotoGallery key={filter} items={items} />
      </section>

      <VisitBand />
    </>
  );
}
