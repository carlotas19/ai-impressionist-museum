import type { Artwork } from "@/lib/types";

interface MuseumPlaqueProps {
  artwork: Artwork;
}

export function MuseumPlaque({ artwork }: MuseumPlaqueProps) {
  return (
    <div className="mx-auto w-full max-w-md animate-slide-up rounded-sm border border-museum-border bg-museum-plaque/80 p-8 backdrop-blur-sm">
      <div className="plaque-rule mb-6" />
      <h3 className="font-serif text-2xl font-light tracking-wide text-museum-cream">
        {artwork.title}
      </h3>
      <p className="mt-2 font-sans text-sm italic text-museum-muted">
        {artwork.artist}
      </p>
      <div className="plaque-rule my-4" />
      <dl className="space-y-3 font-sans text-xs tracking-wide text-museum-muted">
        <div className="flex justify-between">
          <dt>Year</dt>
          <dd className="text-museum-cream/80">{artwork.year}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Medium</dt>
          <dd className="text-right text-museum-cream/80">{artwork.medium}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Model</dt>
          <dd className="font-mono text-museum-cream/80">{artwork.modelId}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Branch</dt>
          <dd className="font-mono text-museum-cream/80">{artwork.branchName}</dd>
        </div>
      </dl>
      <p className="mt-6 font-sans text-sm leading-relaxed text-museum-cream/70">
        {artwork.description}
      </p>
      <div className="mt-6 flex gap-2">
        {artwork.palette.map((color) => (
          <span
            key={color}
            className="h-4 w-4 rounded-full border border-museum-border"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
