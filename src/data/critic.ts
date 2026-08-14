import type { Artwork } from "@/lib/types";
import { gallery } from "./gallery";

export type VerdictKind = "beautiful" | "transformative" | "inadequate";

export interface CriticVerdict {
  kind: VerdictKind;
  label: string;
  eyebrow: string;
  artworkId: string;
  headline: string;
  body: string[];
}

function artwork(id: string): Artwork {
  const found = gallery.find((a) => a.id === id);
  if (!found) throw new Error(`Missing artwork: ${id}`);
  return found;
}

export const criticVerdicts: CriticVerdict[] = [
  {
    kind: "beautiful",
    label: "Most Beautiful",
    eyebrow: "The Laureate",
    artworkId: "woman-parasol",
    headline: "Light, wind, and a model that actually looked up",
    body: [
      "GPT-5.6 Luna's Woman with a Parasol is the painting you would steal from the gift shop and hang above a sofa you do not own. The dress catches the weather. The hillside refuses to sit still. The sky does that Impressionist thing where clouds become verbs.",
      "We are calling this the most beautiful not because it is the most complicated, but because it feels the most felt. Luna did not merely render a figure with an umbrella. She staged a tiny holiday for the retina — and then had the decency to leave room for air.",
      "If AI is accused of having no soul, exhibit A is this white dress billowing like it has somewhere to be. Bravo, Luna. The house awards you the softest prize: people will linger.",
    ],
  },
  {
    kind: "transformative",
    label: "Most Transformative",
    eyebrow: "The Disruptor",
    artworkId: "dance-ball",
    headline: "From plein air to chandelier — a full costume change",
    body: [
      "While half the gallery stayed politely outdoors (ponds, poppies, harbors — the greatest hits album of 1874), GPT-5.5 dragged Impressionism indoors, turned up the chandeliers, and insisted on a waltz.",
      "Dance at the Ball is transformative because it refuses the usual postcard brief. Thick gold light. A crowded floor. Silk that behaves like weather. It is the same movement language as the landscapes, applied to perfume, heat, and social gravity.",
      "In a show about whether models can feel, most of the cast painted the afternoon. GPT-5.5 painted the afterparty. That pivot alone earns the transformative ribbon — and a slightly raised eyebrow from the landscape committee.",
    ],
  },
  {
    kind: "inadequate",
    label: "Least Adequate",
    eyebrow: "The Honorable Mention We Cannot Quite Honor",
    artworkId: "field-poppies",
    headline: "Technically a masterpiece, spiritually a very good fridge magnet",
    body: [
      "Do not misunderstand: GPT-5.4 Mini's Field of Poppies is pretty. Aggressively pretty. It has done the reading. It has highlighted the Monet chapter in yellow. The sky is correct. The cottage is correct. The poppies are so correct they could sue for trademark.",
      "And that, dear visitor, is the problem. In a gallery that rewards risk, this canvas feels like the student who arrives early, sits in the front row, and reproduces the syllabus with terrifying competence. Beautiful? Often. Surprising? Almost never. It is Impressionism as a well-behaved LinkedIn banner.",
      "We crown it Least Adequate not as cruelty, but as tough love. Mini, you can paint a field. Next time, scare us a little. Knock over the easel. Invent a weather system. Until then: lovely work, please see us after class.",
    ],
  },
];

export function verdictArtwork(verdict: CriticVerdict): Artwork {
  return artwork(verdict.artworkId);
}
