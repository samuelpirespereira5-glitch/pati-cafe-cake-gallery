import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartButton } from "./cart/CartButton";
import { Logo } from "./Logo";
import { navLinks } from "./nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" aria-label="Pati Café Boutique — início" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm tracking-wide text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-primary after:w-full" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <CartButton />
          <Button asChild variant="cafe" size="xl" className="hidden h-11 lg:inline-flex">
            <Link to="/cardapio">Fazer pedido</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Menu móvel"
          className="animate-in fade-in slide-in-from-top-2 border-t border-border/70 bg-background px-5 pb-8 pt-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-4 font-display text-2xl text-primary"
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="cafe" size="xl" className="mt-6 w-full">
            <Link to="/cardapio" onClick={() => setOpen(false)}>
              Fazer pedido
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
