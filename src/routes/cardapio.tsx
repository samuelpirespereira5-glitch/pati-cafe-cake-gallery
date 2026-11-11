import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MenuList } from "@/components/site/MenuList";
import { PhotoImage } from "@/components/site/PhotoImage";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { VisitBand } from "@/components/site/VisitBand";
import { menuSections } from "@/lib/menu";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Pati Café Boutique" },
      {
        name: "description",
        content:
          "Cafés, chás, salgados, bebidas geladas, bolos e doces artesanais. Veja o cardápio da Pati Café Boutique.",
      },
      { property: "og:title", content: "Cardápio — Pati Café Boutique" },
      {
        property: "og:description",
        content: "Espressos, cappuccinos, chás, croissant, empanadas, bolos e doces artesanais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CardapioPage,
});

function section(id: string) {
  const found = menuSections.find((s) => s.id === id);
  if (!found) throw new Error(`Seção do cardápio não encontrada: ${id}`);
  return found;
}

const jump = [
  { id: "cafes", label: "Cafés" },
  { id: "chas", label: "Chás" },
  { id: "salgados", label: "Salgados" },
  { id: "geladas", label: "Bebidas geladas" },
  { id: "vitrine", label: "Bolos, doces e sobremesas" },
];

const vitrine = [
  { title: "Bolos e tortas", photo: photos.fatiaBolo },
  { title: "Sobremesas", photo: photos.boloChocolate },
  { title: "Doces artesanais", photo: photos.vitrineDoces },
];

function CardapioPage() {
  return (
    <>
      <section className="bg-warm pb-14 pt-36 md:pt-44">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <Reveal>
            <p className="eyebrow">Nosso cardápio</p>
            <h1 className="mt-3 font-script text-7xl font-medium leading-none text-primary md:text-8xl">
              Cardápio
            </h1>
            <span className="gold-rule mx-auto mt-6" />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Cafés especiais, chás, salgados e as delícias da nossa vitrine.
            </p>
          </Reveal>
          <nav aria-label="Categorias do cardápio" className="mt-10 flex flex-wrap justify-center gap-3">
            {jump.map((j) => (
              <a
                key={j.id}
                href={`#${j.id}`}
                className="rounded-full border border-border bg-card px-5 py-2 text-sm tracking-wide text-primary transition-all duration-300 hover:border-gold hover:bg-secondary"
              >
                {j.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Cafés + Chás */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[380px_1fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[380px] lg:sticky lg:top-28 lg:self-start">
            <div className="photo-frame">
              <PhotoImage photo={photos.cappuccinoCanela} className="shadow-photo" />
            </div>
          </Reveal>
          <div className="grid gap-16 xl:grid-cols-2 xl:gap-14">
            <Reveal>
              <div id="cafes" className="scroll-mt-28">
                <p className="eyebrow">Cafés</p>
                <h2 className="mb-10 mt-3 text-4xl">Cafés e bebidas especiais</h2>
                <MenuList section={section("cafes")} />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div id="chas" className="scroll-mt-28">
                <p className="eyebrow">Chás</p>
                <h2 className="mb-10 mt-3 text-4xl">Chás</h2>
                <MenuList section={section("chas")} />
              </div>
              <div className="mt-12">
                <PhotoImage photo={photos.cappuccinoBandeja} className="shadow-soft" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Salgados + Geladas */}
      <section className="bg-secondary/60 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-[1fr_380px] lg:gap-20">
          <div className="grid gap-16 xl:grid-cols-2 xl:gap-14">
            <Reveal>
              <div id="salgados" className="scroll-mt-28">
                <p className="eyebrow">Salgados</p>
                <h2 className="mb-10 mt-3 text-4xl">Salgados e acompanhamentos</h2>
                <MenuList section={section("salgados")} />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div id="geladas" className="scroll-mt-28">
                <p className="eyebrow">Bebidas geladas</p>
                <h2 className="mb-10 mt-3 text-4xl">Bebidas geladas</h2>
                <MenuList section={section("geladas")} />
              </div>
            </Reveal>
          </div>
          <Reveal className="mx-auto w-full max-w-[380px] lg:sticky lg:top-28 lg:self-start">
            <div className="photo-frame">
              <PhotoImage photo={photos.vitrineSalgados} className="shadow-photo" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vitrine */}
      <section id="vitrine" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionHeading eyebrow="Da nossa vitrine" title={<>Bolos, doces e <em>sobremesas</em></>}>
            Os sabores da vitrine mudam a cada dia. Venha conferir as opções disponíveis e escolher a sua
            favorita.
          </SectionHeading>
        </Reveal>
        <div className="mt-16 grid items-start gap-10 md:grid-cols-3">
          {vitrine.map((v, i) => (
            <Reveal key={v.title} delay={i * 120}>
              <article className="group">
                <PhotoImage photo={v.photo} className="shadow-soft" />
                <div className="mt-5 flex items-baseline gap-3">
                  <h3 className="text-2xl">{v.title}</h3>
                  <span className="menu-leader" aria-hidden />
                  <span className="shrink-0 text-xs tracking-[0.2em] text-muted-foreground">
                    CONSULTE
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.photo.caption}.</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Button asChild variant="cafe" size="xl">
            <Link to="/galeria">Ver mais fotos</Link>
          </Button>
        </Reveal>
      </section>

      <VisitBand />
    </>
  );
}
