import { Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, MessageCircle } from "lucide-react";
import { mapLink, siteConfig, whatsappLink } from "@/lib/site-config";
import { Logo } from "./Logo";
import { navLinks } from "./nav";

export function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="bg-espresso pb-24 text-espresso-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Logo light />
            <p className="mt-6 font-display text-2xl italic text-espresso-foreground/90">“{siteConfig.tagline}”</p>
            <div className="mt-6 flex gap-3">
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram ${siteConfig.instagramHandle}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso-foreground/25 transition-colors hover:border-gold hover:text-gold"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-espresso-foreground/25 transition-colors hover:border-gold hover:text-gold"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-5 text-sm">
            <p className="eyebrow">Visite-nos</p>
            <a
              href={mapLink()}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center gap-3 text-espresso-foreground/80 transition-colors hover:text-gold md:justify-start"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="max-w-xs leading-relaxed">{siteConfig.address || "Endereço a confirmar"}</span>
            </a>
            <div className="flex justify-center gap-3 md:justify-start">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <ul className="space-y-1 text-espresso-foreground/80">
                {siteConfig.hours.map((h) => (
                  <li key={h.days}>
                    {h.days}: <span className="text-espresso-foreground">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="flex justify-center gap-3 text-espresso-foreground/80 transition-colors hover:text-gold md:justify-start"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {siteConfig.whatsappDisplay}
              </a>
            )}
          </div>

          <div className="space-y-5 text-sm">
            <p className="eyebrow">Navegue</p>
            <nav aria-label="Rodapé">
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-espresso-foreground/80 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {siteConfig.instagramCestas && (
              <p className="text-espresso-foreground/65">
                Cestas e presentes:{" "}
                <a
                  href={siteConfig.instagramCestas}
                  target="_blank"
                  rel="noreferrer"
                  className="text-espresso-foreground underline-offset-4 hover:text-gold hover:underline"
                >
                  {siteConfig.instagramCestasHandle}
                </a>
              </p>
            )}
          </div>
        </div>
        <div className="mt-14 border-t border-espresso-foreground/15 pt-6 text-center text-xs tracking-wide text-espresso-foreground/55">
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
