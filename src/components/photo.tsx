"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { unsplash, unsplashSrcSet } from "@/data/images";
import { cn } from "@/lib/cn";

/** Forces eager loading — used for the hidden print copy of the pitch deck. */
export const EagerImages = createContext(false);

type PhotoProps = {
  id: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  widths?: number[];
  children?: React.ReactNode;
};

/**
 * Responsive Unsplash photo with a warm gradient placeholder,
 * fade-in on load and a graceful fallback if the CDN is unreachable.
 */
export function Photo({
  id,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  widths,
  children,
}: PhotoProps) {
  const ref = useRef<HTMLImageElement>(null);
  const eager = useContext(EagerImages) || priority;
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    // the image may have finished before hydration
    if (img.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, [id]);

  return (
    <div className={cn("photo-fallback overflow-hidden", !/\b(absolute|fixed|sticky)\b/.test(className ?? "") && "relative", className)}>
      {status !== "error" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={unsplash(id, 1080)}
          srcSet={unsplashSrcSet(id, widths)}
          sizes={sizes}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          draggable={false}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out",
            status === "loaded" ? "opacity-100" : "scale-[1.03] opacity-0 blur-sm",
            imgClassName,
          )}
        />
      )}
      {status === "error" && (
        <div className="absolute inset-0 grid place-items-center text-white/70" aria-hidden>
          <ImageOff className="size-6" />
        </div>
      )}
      {children}
    </div>
  );
}
