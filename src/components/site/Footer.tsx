import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { Logo } from "./Logo";
import { navLinks } from "./nav";

export function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="bg-espresso text-espresso-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-col items-center text-center">
          <Logo light />
          <p className="mt-6 font-display text-2xl italic text-espresso-foreground/90">
            “{siteConfig.tagline}”
          </p>
          <nav aria-label="Rodapé" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm tracking-wide">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-espresso-foreground/75 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex gap-3">
            {siteConfig.instagram && (
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
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
        <div className="mt-14 border-t border-espresso-foreground/15 pt-6 text-center text-xs tracking-wide text-espresso-foreground/55">
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
