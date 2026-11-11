import { cn } from "@/lib/utils";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-display text-[1.65rem] font-medium tracking-[0.12em]",
          light ? "text-espresso-foreground" : "text-primary",
        )}
      >
        PATI CAFÉ
      </span>
      <span className="mt-1 text-[0.58rem] font-medium tracking-[0.68em] text-gold">BOUTIQUE</span>
    </span>
  );
}
