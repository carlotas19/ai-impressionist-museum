import type { ModelConfig } from "./types";

export const IMPRESSIONIST_PROMPT_PREFIX =
  "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. " +
  "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. ";

export const GALLERY_MODELS: ModelConfig[] = [
  {
    modelId: "gpt-5-nano",
    branchName: "model-gpt-5-nano",
    displayName: "GPT-5 Nano",
    subject: "Water Lilies at Dusk",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "A tranquil pond covered in water lilies at dusk, with reflections of violet and gold sky on still water. Soft atmospheric perspective.",
  },
  {
    modelId: "gpt-5-mini",
    branchName: "model-gpt-5-mini",
    displayName: "GPT-5 Mini",
    subject: "Boulevard in the Rain",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "A Parisian boulevard after rain, gas lamps glowing, umbrellas in motion, wet cobblestones reflecting amber light.",
  },
  {
    modelId: "gpt-5-4-mini",
    branchName: "model-gpt-5-4-mini",
    displayName: "GPT-5.4 Mini",
    subject: "Field of Poppies",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "A sun-drenched field of red poppies bending in a summer breeze, distant farmhouse, cerulean sky with wispy clouds.",
  },
  {
    modelId: "gpt-5-4",
    branchName: "model-gpt-5-4",
    displayName: "GPT-5.4",
    subject: "Harbor at Sunrise",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "A fishing harbor at sunrise, boats at anchor, masts silhouetted against peach and lavender morning light on calm water.",
  },
  {
    modelId: "gpt-5-6-luna",
    branchName: "model-gpt-5-6-luna",
    displayName: "GPT-5.6 Luna",
    subject: "Woman with a Parasol",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "A woman standing on a grassy hill holding a white parasol, wind in her dress, dappled sunlight through scattered clouds.",
  },
  {
    modelId: "gpt-5-6-terra",
    branchName: "model-gpt-5-6-terra",
    displayName: "GPT-5.6 Terra",
    subject: "Haystacks in Golden Light",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "Two haystacks in a rural field bathed in late-afternoon golden light, long shadows, warm ochre and amber tones.",
  },
  {
    modelId: "gpt-5-5",
    branchName: "model-gpt-5-5",
    displayName: "GPT-5.5",
    subject: "Dance at the Ball",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "An elegant ballroom scene with dancers in motion, chandeliers overhead, silk gowns swirling in soft candlelight.",
  },
  {
    modelId: "gpt-5-6-sol",
    branchName: "model-gpt-5-6-sol",
    displayName: "GPT-5.6 Sol",
    subject: "Montmartre Café Terrace",
    prompt:
      IMPRESSIONIST_PROMPT_PREFIX +
      "A Montmartre café terrace at twilight, small round tables, warm interior glow spilling onto the cobblestone street.",
  },
];
