import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { photos } from "@/lib/photos";
import { Reveal } from "./Reveal";

export function VisitBand() {
  return (
    <section className="relative overflow-hidden bg-espresso text-espresso-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-28">
        <Reveal>
          <p className="eyebrow">Venha nos visitar</p>
          <h2 className="mt-5 text-4xl leading-[1.05] text-espresso-foreground md:text-6xl">
            Uma mesa, um café e <em className="text-gold">o seu tempo.</em>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-espresso-foreground/75">
            Reserve um momento só seu. Escolha um doce na vitrine, peça seu café favorito e aproveite
            o aconchego da Pati Café Boutique.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="xl">
              <Link to="/contato">Como chegar</Link>
            </Button>
            <Button
              asChild
              variant="cafeOutline"
              size="xl"
              className="border-espresso-foreground/30 text-espresso-foreground hover:bg-espresso-foreground/10"
            >
              <Link to="/cardapio">Ver o cardápio</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={150} className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-[420px]">
            <div
              className="overflow-hidden rounded-2xl shadow-photo"
              style={{ aspectRatio: `${photos.cappuccinoBandeja.width} / ${photos.cappuccinoBandeja.height}` }}
            >
              <img
                src={photos.cappuccinoBandeja.src}
                alt={photos.cappuccinoBandeja.alt}
                width={photos.cappuccinoBandeja.width}
                height={photos.cappuccinoBandeja.height}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
