# The AI Artiste

An impressionist museum showcasing art painted by AI — eight GPT-5 model variants, each interpreting a classic subject through [Neon AI Gateway](https://neon.com/docs/ai-gateway/overview).

**Live:** deployed on Vercel from this repository.

---

## What this is

**The AI Artiste** is a small public showcase for [Neon AI Gateway](https://neon.com/docs/ai-gateway/overview) and [Neon branching](https://neon.com/docs/introduction/branching).

Visitors get two tabs:

1. **Gallery** — a museum-style showroom. Each painting has a plaque naming the GPT-5 model as the artist, plus a short wall-text description.
2. **Methodology** — how the show was made: one Neon project, one branch per model, image generation through the gateway’s OpenAI Responses `image_generation` tool, frontend on Next.js / Vercel.

### Honest framing

Neon AI Gateway’s image-capable models today are **OpenAI GPT-5 variants**. They share one renderer (the Responses `image_generation` tool). The model is still the “artiste”: each variant receives the same kind of impressionist brief and composes its own scene. Plaques credit the real model ID; the Methodology tab explains the shared renderer.

---

## The collection

| Branch | Model | Subject |
|--------|-------|---------|
| `model-gpt-5-nano` | `gpt-5-nano` | Water Lilies at Dusk |
| `model-gpt-5-mini` | `gpt-5-mini` | Boulevard in the Rain |
| `model-gpt-5-4-mini` | `gpt-5-4-mini` | Field of Poppies |
| `model-gpt-5-4` | `gpt-5-4` | Harbor at Sunrise |
| `model-gpt-5-6-luna` | `gpt-5-6-luna` | Woman with a Parasol |
| `model-gpt-5-6-terra` | `gpt-5-6-terra` | Haystacks in Golden Light |
| `model-gpt-5-5` | `gpt-5-5` | Dance at the Ball |
| `model-gpt-5-6-sol` | `gpt-5-6-sol` | Montmartre Café Terrace |

Generated JPEGs live in [`public/art/`](./public/art/). Metadata lives in [`src/data/gallery.ts`](./src/data/gallery.ts).

---

## Stack

- **[Neon](https://neon.com)** — Postgres + AI Gateway + one branch per model
- **[Neon AI Gateway](https://neon.com/docs/ai-gateway/overview)** — inference with a Neon credential (no separate OpenAI key)
- **Next.js** — gallery UI
- **Vercel** — hosting

---

## Run locally

```bash
git clone https://github.com/carlotas19/ai-impressionist-museum.git
cd ai-impressionist-museum
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The committed gallery images are enough for a full local preview — no Neon credentials required just to view the site.

---

## Regenerate the art (optional)

Image generation needs a Neon project that can call AI Gateway:

1. **Region:** `aws-us-east-2` (Ohio) — AI Gateway is only available there  
2. **Plan:** paid (Launch / Scale / Enterprise)  
3. **Credential:** branch credential with scope `ai_gateway:invoke`  
4. **Env vars** in `.env.local` (see [`.env.example`](./.env.example)):

```bash
DATABASE_URL=                 # Neon pooled connection string
NEON_AI_GATEWAY_TOKEN=        # nt_live_...
NEON_AI_GATEWAY_BASE_URL=     # https://br-...-api.ai....us-east-2.aws.neon.tech
NEON_PROJECT_ID=              # optional, for branch scripts
NEON_API_KEY=                 # optional, for branch scripts
```

Then:

```bash
# Create the artworks table (optional metadata store)
npm run setup:db

# Create one Neon branch per model (optional demo of branching)
npm run setup:branches

# Generate JPEGs into public/art/
python3 scripts/generate_art_http.py
# or, with Node deps installed:
npm run generate
```

> **Note:** Prefer `streamText` / streaming when using the AI SDK — the gateway caps non-streaming responses near ~640 KB. This repo’s HTTP script requests `quality: low` JPEGs so a non-streaming Responses call stays under that limit.

Docs: [AI Gateway overview](https://neon.com/docs/ai-gateway/overview) · [Models](https://neon.com/docs/ai-gateway/models) · [Responses / image generation](https://neon.com/docs/ai-gateway/openai-responses)

---

## Neon project used for this showcase

Created in the **Neon DevRel** org:

| | |
|--|--|
| Project | `the-ai-artiste` |
| Project ID | `shy-star-02764190` |
| Region | `aws-us-east-2` |
| Branches | `main` + eight `model-gpt-5-*` branches |

---

## Deploy

Connect this GitHub repo to Vercel (Import Project), or:

```bash
npx vercel --prod
```

No server-side Neon env vars are required for the static gallery: images and metadata are in the repo.

---

## Project layout

```
public/art/                 # Generated JPEG gallery
scripts/
  generate_art_http.py      # Gateway image generation (stdlib Python)
  generate-art.ts           # Same idea via @neon/ai-sdk-provider
  setup-branches.ts
  setup-db.ts
src/
  app/                      # Next.js App Router
  components/               # Gallery, Methodology, plaques, Neon badge
  data/gallery.ts           # Wall texts + model attribution
  lib/models.ts             # Prompts + branch names
```

---

## License

MIT
