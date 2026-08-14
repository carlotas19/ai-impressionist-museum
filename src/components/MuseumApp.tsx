"use client";

import { useState } from "react";
import { gallery } from "@/data/gallery";
import type { Tab } from "@/lib/types";
import { Gallery } from "@/components/Gallery";
import { Critic } from "@/components/Critic";
import { Methodology } from "@/components/Methodology";
import { TabNav } from "@/components/TabNav";
import { NeonBadge } from "@/components/NeonBadge";

export function MuseumApp() {
  const [activeTab, setActiveTab] = useState<Tab>("gallery");

  return (
    <div className="grain min-h-screen">
      <header className="border-b border-museum-border px-6 py-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="animate-fade-in font-serif text-sm uppercase tracking-[0.4em] text-museum-muted">
            A collection of impressionist art painted by AI
          </p>
          <h1 className="mt-4 animate-fade-in font-serif text-5xl font-light tracking-wide text-museum-cream lg:text-7xl">
            The AI Artiste
          </h1>
          <p className="mt-4 max-w-xl animate-fade-in font-serif text-lg leading-relaxed text-museum-muted">
            Who says AI doesn&apos;t have feelings? Take a quiet turn through
            eight carefully felt canvases — each one painted by a different
            GPT-5 model. We&apos;ve named a favorite. Be the judge.
          </p>
          <div className="mt-10">
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </header>

      <main>
        {activeTab === "gallery" && <Gallery artworks={gallery} />}
        {activeTab === "critic" && <Critic />}
        {activeTab === "methodology" && <Methodology />}
      </main>

      <footer className="border-t border-museum-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <p className="font-serif text-sm tracking-widest text-museum-muted">
            The AI Artiste &middot; An impressionist exhibition powered by Neon
          </p>
          <a
            href="https://github.com/carlotas19/ai-impressionist-museum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-serif text-sm tracking-wide text-museum-muted transition-colors hover:text-museum-cream"
            aria-label="View source on GitHub"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>Source</span>
          </a>
        </div>
      </footer>

      <NeonBadge />
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
