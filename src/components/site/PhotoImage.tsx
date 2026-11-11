import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Props = {
  photo: Photo;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** Max rendered width in px — keeps the photo close to its real resolution. */
  maxWidth?: number;
};

/** Shows a café photo at its original proportions (never cropped or stretched). */
export function PhotoImage({ photo, className, imgClassName, eager, maxWidth }: Props) {
  return (
    <div
      className={cn("group relative overflow-hidden rounded-2xl bg-secondary", className)}
      style={{ aspectRatio: `${photo.width} / ${photo.height}`, maxWidth }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]",
          imgClassName,
        )}
      />
    </div>
  );
}
