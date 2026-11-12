import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtyStepper({
  qty,
  onChange,
  label,
  className,
}: {
  qty: number;
  onChange: (qty: number) => void;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center rounded-full border border-primary/25 bg-card text-primary",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label={`Diminuir ${label}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-6 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label={`Aumentar ${label}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
