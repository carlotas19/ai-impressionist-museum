"use client";

import Image from "next/image";
import { criticVerdicts, verdictArtwork } from "@/data/critic";
import type { CriticVerdict } from "@/data/critic";

const accent: Record<CriticVerdict["kind"], string> = {
  beautiful: "border-l-museum-cream",
  transformative: "border-l-neon-green/70",
  inadequate: "border-l-museum-muted",
};

export function Critic() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16 lg:px-0">
      <header className="mb-16 animate-fade-in">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-museum-muted">
          The house critic speaks
        </p>
        <h2 className="mt-4 font-serif text-4xl font-light tracking-wide text-museum-cream lg:text-5xl">
          Critic&apos;s Verdict
        </h2>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-museum-cream/70">
          Eight models entered. Three left with ribbons — and one left with
          notes. Our critic has opinions, a soft spot for parasols, and no
          formal art-history degree. Read at your own aesthetic risk.
        </p>
      </header>

      <div className="space-y-20">
        {criticVerdicts.map((verdict, index) => {
          const art = verdictArtwork(verdict);
          const reverse = index % 2 === 1;

          return (
            <section
              key={verdict.kind}
              className={`animate-fade-in border-l-2 pl-6 md:pl-8 ${accent[verdict.kind]}`}
            >
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-museum-muted">
                {verdict.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-3xl font-light text-museum-cream">
                {verdict.label}
              </h3>

              <div
                className={`mt-8 flex flex-col gap-8 ${
                  reverse ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="md:w-2/5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-museum-border bg-museum-charcoal">
                    <Image
                      src={art.imagePath}
                      alt={art.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                  <div className="mt-4 font-sans text-xs tracking-wide text-museum-muted">
                    <p className="text-museum-cream/90">{art.title}</p>
                    <p className="mt-1 italic">{art.artist}</p>
                    <p className="mt-1 font-mono text-museum-muted/80">
                      {art.modelId}
                    </p>
                  </div>
                </div>

                <div className="md:w-3/5">
                  <h4 className="font-serif text-xl font-light leading-snug text-museum-cream/90">
                    {verdict.headline}
                  </h4>
                  <div className="mt-5 space-y-4 font-sans text-base leading-relaxed text-museum-cream/70">
                    {verdict.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-20 border-t border-museum-border pt-8 text-center font-sans text-sm italic text-museum-muted">
        Verdicts are binding in this browser tab only. Your favorite may
        dissent — and should.
      </p>
    </article>
  );
}
