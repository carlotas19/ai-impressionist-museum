"use client";

import { useState } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { gallery } from "@/data/gallery";
import type { Tab } from "@/lib/types";
import { Gallery } from "@/components/Gallery";
import { Methodology } from "@/components/Methodology";
import { TabNav } from "@/components/TabNav";
import { NeonBadge } from "@/components/NeonBadge";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function MuseumApp() {
  const [activeTab, setActiveTab] = useState<Tab>("gallery");

  return (
    <div
      className={`grain min-h-screen ${cormorant.variable} ${inter.variable}`}
    >
      <header className="border-b border-museum-border px-6 py-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="animate-fade-in font-sans text-xs uppercase tracking-[0.4em] text-museum-muted">
            A collection of impressionist art painted by AI
          </p>
          <h1 className="mt-4 animate-fade-in font-serif text-5xl font-light tracking-wide text-museum-cream lg:text-7xl">
            The AI Artiste
          </h1>
          <p className="mt-4 max-w-xl animate-fade-in font-sans text-sm leading-relaxed text-museum-muted">
            Eight GPT-5 models. Eight interpretations. One shared renderer.
            Each work in this gallery was composed by a different model variant
            through Neon AI Gateway.
          </p>
          <div className="mt-10">
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </header>

      <main>
        {activeTab === "gallery" ? (
          <Gallery artworks={gallery} />
        ) : (
          <Methodology />
        )}
      </main>

      <footer className="border-t border-museum-border px-6 py-8 text-center">
        <p className="font-sans text-xs tracking-widest text-museum-muted">
          The AI Artiste &middot; An impressionist exhibition powered by Neon
        </p>
      </footer>

      <NeonBadge />
    </div>
  );
}
