import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={count > 0 ? `Abrir sacola, ${count} ${count === 1 ? "item" : "itens"}` : "Abrir sacola"}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-semibold text-gold-foreground">
          {count}
        </span>
      )}
    </button>
  );
}
