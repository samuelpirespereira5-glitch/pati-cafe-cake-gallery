import { ShoppingBag } from "lucide-react";
import { formatBRL } from "@/lib/order";
import { useCart } from "./CartProvider";

/** Floating summary that appears once the bag has items. */
export function CartBar() {
  const { count, total, open, setOpen } = useCart();
  if (count === 0 || open) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pointer-events-auto flex w-full max-w-sm items-center gap-4 rounded-full bg-primary py-2.5 pl-3 pr-6 text-primary-foreground shadow-photo transition-transform duration-300 animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-0.5"
      >
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground">
          <ShoppingBag className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-card px-1 text-[0.65rem] font-semibold text-primary">
            {count}
          </span>
        </span>
        <span className="flex-1 text-left text-sm tracking-wide">Ver sacola</span>
        <span className="font-display text-xl">{formatBRL(total)}</span>
      </button>
    </div>
  );
}
