import { useOpenStatus } from "@/hooks/use-open-status";
import { cn } from "@/lib/utils";

export function OpenBadge({ className, light }: { className?: string; light?: boolean }) {
  const status = useOpenStatus();
  if (!status) return <span className={cn("inline-block h-8", className)} aria-hidden />;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs tracking-wide",
        light
          ? "border-espresso-foreground/20 text-espresso-foreground/85"
          : "border-border bg-card/80 text-primary",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            status.open ? "bg-gold" : "bg-muted-foreground/60",
          )}
        />
      </span>
      {status.label}
    </span>
  );
}
