import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/lib/photos";
import { Reveal } from "./Reveal";

/** Masonry gallery that keeps every photo's real proportions, with a full-view lightbox. */
export function PhotoGallery({ items }: { items: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = index !== null ? items[index] : null;

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 120} className="break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-secondary shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
                aria-label={`Ampliar foto: ${p.caption}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/0 to-espresso/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-primary opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </button>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-1">
                <span className="font-display text-lg text-primary">{p.caption}</span>
                <span className="eyebrow shrink-0 !text-[0.6rem] !tracking-[0.3em]">{p.category}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
          <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none md:p-10">
            {current && (
              <>
                <DialogPrimitive.Title className="sr-only">{current.caption}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">{current.alt}</DialogPrimitive.Description>
                <img
                  key={current.id}
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  className="animate-in fade-in zoom-in-95 max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-photo"
                  style={{ maxWidth: `min(100%, ${current.width * 1.5}px)` }}
                />
                <p className="mt-5 text-center font-display text-xl text-espresso-foreground">
                  {current.caption}
                  <span className="ml-3 text-sm text-espresso-foreground/60">
                    {index! + 1} / {items.length}
                  </span>
                </p>
              </>
            )}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-card/15 text-espresso-foreground transition-colors hover:bg-card/30 md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-card/15 text-espresso-foreground transition-colors hover:bg-card/30 md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <DialogPrimitive.Close
              aria-label="Fechar"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/15 text-espresso-foreground transition-colors hover:bg-card/30 md:right-8 md:top-8"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
