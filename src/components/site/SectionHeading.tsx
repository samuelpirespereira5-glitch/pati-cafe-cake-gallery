import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({ eyebrow, title, children, align = "center", className }: Props) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-[1.05] md:text-5xl">{title}</h2>
      <span className={cn("gold-rule mt-6", centered && "mx-auto")} />
      {children && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{children}</p>
      )}
    </div>
  );
}
