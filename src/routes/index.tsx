import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coffee, Heart, Sparkles, Armchair } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhotoImage } from "@/components/site/PhotoImage";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { VisitBand } from "@/components/site/VisitBand";
import { photos, type Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pati Café Boutique — Um momento especial merece um café especial" },
      {
        name: "description",
        content:
          "Cafés especiais, bolos artesanais, doces e salgados em um ambiente aconchegante. Descubra sabores e aromas únicos na Pati Café Boutique.",
      },
      { property: "og:title", content: "Pati Café Boutique" },
      {
        property: "og:description",
        content: "Um momento especial merece um café especial. Cafés, bolos e doces artesanais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const categories: { name: string; note: string; photo: Photo }[] = [
  { name: "Cafés e bebidas especiais", note: "Espressos, cappuccinos, chás e chocolate quente", photo: photos.cappuccinoCanela },
  { name: "Bolos e tortas", note: "Fatias artesanais com coberturas e caldas", photo: photos.fatiaBolo },
  { name: "Doces artesanais", note: "Donuts, docinhos e delícias da vitrine", photo: photos.vitrineDoces },
  { name: "Salgados e acompanhamentos", note: "Croissant, empanadas, tortinhas e mais", photo: photos.vitrineSalgados },
  { name: "Sobremesas", note: "Chocolate, castanhas e frutas frescas", photo: photos.boloChocolate },
];

const pillars = [
  { icon: Armchair, title: "Ambiente aconchegante", text: "Madeira, tijolinhos e luz suave para você ficar à vontade." },
  { icon: Coffee, title: "Cafés com carinho", text: "Cada xícara preparada com atenção, do espresso ao cappuccino." },
  { icon: Heart, title: "Doces especiais", text: "Bolos, tortas e sobremesas que encantam os olhos e o paladar." },
  { icon: Sparkles, title: "Experiência única", text: "Detalhes pensados para transformar uma pausa em um momento." },
];

function Home() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-warm pt-28 md:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p className="eyebrow">Cafeteria boutique</p>
            <h1 className="mt-6 text-5xl leading-[0.98] sm:text-6xl xl:text-[5.4rem]">
              Um momento especial merece um <em className="text-gold">café especial.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Descubra sabores, aromas e experiências únicas na Pati Café Boutique.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="cafe" size="xl">
                <Link to="/cardapio">
                  Conheça nosso cardápio <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="cafeOutline" size="xl">
                <Link to="/contato">Venha nos visitar</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] animate-in fade-in zoom-in-95 duration-1000">
            <div className="photo-frame">
              <PhotoImage photo={photos.boloChocolate} eager className="shadow-photo" />
            </div>
            <div className="absolute -bottom-8 -left-6 hidden w-40 rotate-[-4deg] rounded-2xl bg-card p-2 shadow-photo sm:block md:-left-16 md:w-44">
              <PhotoImage photo={photos.cappuccinoCanela} eager className="rounded-xl" />
            </div>
            <div className="absolute -right-3 top-8 rounded-full bg-card/95 px-5 py-3 shadow-soft backdrop-blur md:-right-8">
              <p className="font-display text-base italic text-primary">Bolo de chocolate</p>
              <p className="text-[0.65rem] tracking-[0.3em] text-gold">COM CASTANHAS</p>
            </div>
          </div>
        </div>

        <div className="border-y border-border/70 bg-card/60">
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 text-[0.7rem] tracking-[0.38em] text-primary/70 md:px-8">
            {["Cafés especiais", "Bolos artesanais", "Doces", "Salgados", "Chás"].map((t, i) => (
              <li key={t} className="flex items-center gap-10">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />}
                {t.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOBRE */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="mx-auto w-full max-w-[520px]">
            <div className="photo-frame">
              <PhotoImage photo={photos.cappuccinoBandeja} className="shadow-photo" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading eyebrow="Sobre nós" title={<>Feito com carinho, <em>servido com afeto.</em></>} align="left">
                Na Pati Café Boutique, cada detalhe é pensado para que sua visita seja leve e especial — do
                aroma do café passado na hora ao doce escolhido na vitrine.
              </SectionHeading>
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <p.icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-3 text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <Button asChild variant="link" className="mt-10 px-0 text-base">
                <Link to="/sobre">
                  Conheça nossa casa <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CARDÁPIO CATEGORIES */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Nosso cardápio" title="Sabores para cada momento">
              Do primeiro café da manhã ao lanche da tarde, escolha entre bebidas especiais, doces e
              salgados preparados com cuidado.
            </SectionHeading>
          </Reveal>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_440px]">
            <ol className="divide-y divide-border">
              {categories.map((c, i) => (
                <li key={c.name}>
                  <Link
                    to="/cardapio"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-5 py-6 md:gap-8"
                  >
                    <span className="font-display text-lg italic text-gold">0{i + 1}</span>
                    <img
                      src={c.photo.src}
                      alt=""
                      width={c.photo.width}
                      height={c.photo.height}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-full object-cover lg:hidden"
                    />
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-display text-2xl transition-colors md:text-4xl",
                          active === i ? "text-primary" : "text-primary/55",
                        )}
                      >
                        {c.name}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{c.note}</span>
                    </span>
                    <ArrowRight
                      className={cn(
                        "h-5 w-5 text-gold transition-all duration-300",
                        active === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ol>
            <div className="relative hidden h-[540px] items-center justify-center lg:flex">
              {categories.map((c, i) => (
                <div
                  key={c.name}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-700",
                    active === i ? "scale-100 opacity-100" : "pointer-events-none scale-[0.97] opacity-0",
                  )}
                >
                  <PhotoImage
                    photo={c.photo}
                    className="max-h-full w-full shadow-photo"
                    maxWidth={Math.min(440, (540 * c.photo.width) / c.photo.height)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Reveal className="mt-14 text-center">
            <Button asChild variant="cafe" size="xl">
              <Link to="/cardapio">Ver cardápio completo</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* GALERIA PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <SectionHeading eyebrow="Galeria" title={<>Direto da nossa <em>vitrine</em></>}>
            Fotos reais dos nossos cafés, bolos e doces — do jeitinho que chegam à sua mesa.
          </SectionHeading>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <PhotoImage photo={photos.vitrineDoces} className="shadow-soft" />
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <PhotoImage photo={photos.fatiaBolo} className="shadow-soft" />
          </Reveal>
          <Reveal delay={60} className="md:col-span-4 md:col-start-2">
            <PhotoImage photo={photos.vitrineSalgados} className="shadow-soft" />
          </Reveal>
          <Reveal delay={180} className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <p className="font-display text-3xl italic leading-snug text-primary md:text-4xl">
              “Cada fatia, cada xícara, um convite para ficar mais um pouquinho.”
            </p>
            <Button asChild variant="cafeOutline" size="xl" className="mt-8 self-start">
              <Link to="/galeria">
                Ver todas as fotos <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* AMBIENTE */}
      <section className="bg-warm py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <Reveal>
              <SectionHeading eyebrow="Nosso ambiente" title={<>Um cantinho para <em>desacelerar</em></>} align="left">
                Prateleiras de madeira repletas de detalhes, tijolinhos aparentes, flores secas sobre a
                mesa e luzes quentes que deixam tudo mais acolhedor. Um lugar feito para conversar,
                trabalhar ou simplesmente apreciar um bom café.
              </SectionHeading>
            </Reveal>
            <Reveal delay={150}>
              <Button asChild variant="cafe" size="xl" className="mt-10">
                <Link to="/sobre">Conheça o ambiente</Link>
              </Button>
            </Reveal>
          </div>
          <Reveal className="order-1 mx-auto w-full max-w-[400px] lg:order-2">
            <div className="photo-frame">
              <PhotoImage photo={photos.ambiente} className="shadow-photo" />
            </div>
          </Reveal>
        </div>
      </section>

      <VisitBand />
    </>
  );
}
