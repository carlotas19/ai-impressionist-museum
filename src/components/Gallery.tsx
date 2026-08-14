"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Artwork } from "@/lib/types";
import { MuseumPlaque } from "./MuseumPlaque";

interface GalleryProps {
  artworks: Artwork[];
}

export function Gallery({ artworks }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const current = artworks[currentIndex];

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % artworks.length);
  }, [artworks.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + artworks.length) % artworks.length);
  }, [artworks.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="flex min-h-[calc(100vh-12rem)] flex-col">
      {/* Showroom */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12 lg:flex-row lg:gap-16 lg:px-16">
        {/* Artwork frame */}
        <div className="relative w-full max-w-3xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-museum-border bg-museum-charcoal shadow-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {imageError[current.id] ? (
                  <PlaceholderCanvas palette={current.palette} title={current.title} />
                ) : (
                  <Image
                    src={current.imagePath}
                    alt={current.title}
                    fill
                    className="object-cover"
                    priority={currentIndex < 2}
                    onError={() =>
                      setImageError((prev) => ({ ...prev, [current.id]: true }))
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-museum-border bg-museum-charcoal/80 p-3 text-museum-muted backdrop-blur-sm transition-colors hover:border-museum-cream/30 hover:text-museum-cream lg:-left-16"
            aria-label="Previous artwork"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-museum-border bg-museum-charcoal/80 p-3 text-museum-muted backdrop-blur-sm transition-colors hover:border-museum-cream/30 hover:text-museum-cream lg:-right-16"
            aria-label="Next artwork"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Plaque */}
        <div className="mt-10 w-full lg:mt-0 lg:w-auto lg:min-w-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <MuseumPlaque artwork={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="border-t border-museum-border px-6 py-6 lg:px-16">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 overflow-x-auto pb-2">
          {artworks.map((artwork, index) => (
            <button
              key={artwork.id}
              onClick={() => goTo(index)}
              className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-all ${
                index === currentIndex
                  ? "border-museum-cream ring-1 ring-museum-cream/50"
                  : "border-museum-border opacity-50 hover:opacity-80"
              }`}
              aria-label={`View ${artwork.title}`}
              aria-current={index === currentIndex ? "true" : undefined}
            >
              {imageError[artwork.id] ? (
                <PlaceholderCanvas
                  palette={artwork.palette}
                  title={artwork.title}
                  compact
                />
              ) : (
                <Image
                  src={artwork.imagePath}
                  alt=""
                  fill
                  className="object-cover"
                  onError={() =>
                    setImageError((prev) => ({ ...prev, [artwork.id]: true }))
                  }
                />
              )}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center font-sans text-xs tracking-widest text-museum-muted">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(artworks.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}

function PlaceholderCanvas({
  palette,
  title,
  compact,
}: {
  palette: string[];
  title: string;
  compact?: boolean;
}) {
  const gradient = `linear-gradient(135deg, ${palette.join(", ")})`;
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ background: gradient }}
    >
      {!compact && (
        <span className="font-serif text-lg italic text-white/40">{title}</span>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12 4L6 10L12 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M8 4L14 10L8 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
