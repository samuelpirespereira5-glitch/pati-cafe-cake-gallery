import { ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { lineKey } from "@/lib/order";
import type { MenuItem } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";

const pill =
  "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-card px-4 text-[0.8rem] font-medium tracking-wide text-primary transition-all duration-300 hover:border-gold hover:bg-primary hover:text-primary-foreground";

export function AddToCartButton({ item }: { item: MenuItem }) {
  const { add, qtyOf, lines, setQty } = useCart();
  if (item.price === null) return null;
  const price = item.price;
  const qty = qtyOf(item.name);

  if (item.options?.length) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(pill, qty > 0 && "border-gold")} aria-label={`Escolher sabor de ${item.name}`}>
          <Plus className="h-3.5 w-3.5" />
          {qty > 0 ? `${qty} na sacola` : "Escolher sabor"}
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-display text-base font-medium text-primary">
            {item.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.options.map((option) => {
            const n = lines.find((l) => l.key === lineKey(item.name, option))?.qty ?? 0;
            return (
              <DropdownMenuItem
                key={option}
                onSelect={() => add({ name: item.name, price, option })}
                className="cursor-pointer justify-between"
              >
                {option}
                {n > 0 && <span className="text-xs font-medium text-gold">{n}×</span>}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (qty > 0) {
    return <QtyStepper qty={qty} label={item.name} onChange={(n) => setQty(lineKey(item.name), n)} />;
  }

  return (
    <button type="button" onClick={() => add({ name: item.name, price })} className={pill}>
      <Plus className="h-3.5 w-3.5" /> Adicionar
    </button>
  );
}
