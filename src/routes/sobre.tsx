import { createFileRoute, Link } from "@tanstack/react-router";
import { Armchair, Coffee, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoImage } from "@/components/site/PhotoImage";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { VisitBand } from "@/components/site/VisitBand";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre nós e nosso ambiente — Pati Café Boutique" },
      {
        name: "description",
        content:
          "Conheça a Pati Café Boutique: ambiente aconchegante, cafés preparados com carinho e doces especiais.",
      },
      { property: "og:title", content: "Sobre a Pati Café Boutique" },
      {
        property: "og:description",
        content: "Ambiente aconchegante, cafés preparados com carinho e doces especiais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const pillars = [
  {
    icon: Armchair,
    title: "Ambiente aconchegante",
    text: "Um espaço acolhedor, com decoração cheia de detalhes, para você se sentir em casa.",
  },
  {
    icon: Coffee,
    title: "Cafés preparados com carinho",
    text: "Do espresso curto ao cappuccino com espuma aveludada, cada bebida é feita com atenção.",
  },
  {
    icon: Heart,
    title: "Doces e sobremesas especiais",
    text: "Bolos, tortas e doces que deixam a vitrine irresistível e a pausa mais doce.",
  },
  {
    icon: Sparkles,
    title: "Uma experiência diferenciada",
    text: "Louças delicadas, bandejas de madeira e flores à mesa: pequenos gestos que fazem diferença.",
  },
];

function SobrePage() {
  return (
    <>
      <section className="bg-warm pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Sobre nós" title={<>A Pati Café <em>Boutique</em></>}>
              Um café boutique para quem aprecia o sabor das coisas bem-feitas e o prazer de uma pausa
              tranquila.
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="mx-auto w-full max-w-[440px]">
            <div className="photo-frame">
              <PhotoImage photo={photos.cappuccinoCanela} className="shadow-photo" />
            </div>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-transform duration-500 hover:-translate-y-1">
                <p.icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="ambiente" className="bg-secondary/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Nosso ambiente" title={<>Visitar a Pati é <em>uma experiência</em></>}>
              Mesas de madeira, prateleiras iluminadas, tijolinhos aparentes e vitrines sempre cheias de
              cor. Cada canto convida a ficar.
            </SectionHeading>
          </Reveal>

          <div className="mt-16 grid items-start gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <PhotoImage photo={photos.ambiente} className="shadow-photo" />
              <p className="mt-4 font-display text-lg italic text-primary">{photos.ambiente.caption}</p>
            </Reveal>
            <div className="grid gap-6 md:col-span-7">
              <Reveal delay={120}>
                <PhotoImage photo={photos.vitrineDoces} className="shadow-soft" />
                <p className="mt-4 font-display text-lg italic text-primary">{photos.vitrineDoces.caption}</p>
              </Reveal>
              <div className="grid grid-cols-2 items-start gap-6">
                <Reveal delay={180}>
                  <PhotoImage photo={photos.vitrineSalgados} className="shadow-soft" />
                </Reveal>
                <Reveal delay={240}>
                  <PhotoImage photo={photos.cappuccinoBandeja} className="shadow-soft" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Bandejas de madeira, louças rendadas e flores secas: o cuidado aparece em cada
                    detalhe servido.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <Reveal className="mt-16 text-center">
            <Button asChild variant="cafe" size="xl">
              <Link to="/galeria">Ver a galeria completa</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <VisitBand />
    </>
  );
}
