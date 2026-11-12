import { formatPrice, type MenuSection } from "@/lib/menu";
import { AddToCartButton } from "./cart/AddToCartButton";

export function MenuList({ section }: { section: MenuSection }) {
  return (
    <ul className="space-y-8">
      {section.items.map((item) => (
        <li key={item.name} className="group">
          <div className="flex items-baseline gap-3">
            <h4 className="font-display text-xl text-primary transition-colors group-hover:text-gold md:text-[1.4rem]">
              {item.name}
            </h4>
            <span className="menu-leader" aria-hidden />
            <span className="shrink-0 font-sans text-sm font-medium tracking-wide text-primary">
              {formatPrice(item.price)}
            </span>
          </div>
          <div className="mt-2 flex items-start justify-between gap-4">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            <AddToCartButton item={item} />
          </div>
        </li>
      ))}
    </ul>
  );
}
