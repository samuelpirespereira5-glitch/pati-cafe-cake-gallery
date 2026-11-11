import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoImage } from "@/components/site/PhotoImage";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { photos } from "@/lib/photos";
import { mapEmbedUrl, mapLink, siteConfig, whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Localização e contato — Pati Café Boutique" },
      {
        name: "description",
        content: "Endereço, horários, mapa e WhatsApp da Pati Café Boutique. Venha nos visitar.",
      },
      { property: "og:title", content: "Venha nos visitar — Pati Café Boutique" },
      {
        property: "og:description",
        content: "Endereço, horário de funcionamento e contato da Pati Café Boutique.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const wa = whatsappLink();

  return (
    <>
      <section className="bg-warm pb-16 pt-36 md:pt-44">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <SectionHeading eyebrow="Localização e contato" title={<>Venha nos <em>visitar</em></>}>
              Estamos esperando por você com um café quentinho e a vitrine cheia de delícias.
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.4} />
                <div>
                  <h2 className="text-2xl">Endereço</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {siteConfig.address || "Endereço a confirmar."}
                  </p>
                  <a
                    href={mapLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:text-gold hover:underline"
                  >
                    Abrir no Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="flex gap-4">
                <Clock className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.4} />
                <div className="flex-1">
                  <h2 className="text-2xl">Horário de funcionamento</h2>
                  {siteConfig.hours.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {siteConfig.hours.map((h) => (
                        <li key={h.days} className="flex items-baseline gap-3 text-muted-foreground">
                          <span>{h.days}</span>
                          <span className="menu-leader" aria-hidden />
                          <span className="text-primary">{h.hours}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-muted-foreground">Horários a confirmar.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-espresso p-8 text-espresso-foreground shadow-photo">
              <h2 className="text-2xl text-espresso-foreground">Fale com a gente</h2>
              <p className="mt-2 text-espresso-foreground/70">
                Tire dúvidas, faça encomendas ou consulte os sabores do dia.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {wa ? (
                  <Button asChild variant="gold" size="xl">
                    <a href={wa} target="_blank" rel="noreferrer">
                      <MessageCircle /> Conversar no WhatsApp
                    </a>
                  </Button>
                ) : (
                  <Button variant="gold" size="xl" disabled>
                    <MessageCircle /> WhatsApp em breve
                  </Button>
                )}
              </div>
              <div className="mt-6 flex gap-3">
                {[
                  { href: siteConfig.instagram, label: "Instagram", Icon: Instagram },
                  { href: siteConfig.facebook, label: "Facebook", Icon: Facebook },
                ].map(({ href, label, Icon }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso-foreground/25 transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ) : (
                    <span
                      key={label}
                      title={`${label} em breve`}
                      aria-label={`${label} em breve`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso-foreground/15 text-espresso-foreground/40"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
              <iframe
                title="Mapa da Pati Café Boutique"
                src={mapEmbedUrl()}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid grid-cols-2 items-start gap-6">
              <PhotoImage photo={photos.ambiente} className="shadow-soft" />
              <PhotoImage photo={photos.boloChocolate} className="shadow-soft" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
