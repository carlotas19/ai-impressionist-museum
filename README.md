# The AI Artiste

An impressionist museum showcasing art painted by AI — eight GPT-5 model variants, each interpreting a classic subject through [Neon AI Gateway](https://neon.com/docs/ai-gateway/overview).

**Live demo:** Deploy to Vercel with one click.

## The exhibition

Each painting was commissioned with the same impressionist brief but delivered to a different GPT-5 model. The model is the artist — it interprets the subject and composes the scene via OpenAI's `image_generation` tool, exposed through Neon AI Gateway's Responses API.

| Branch | Model | Subject |
|--------|-------|---------|
| `model-gpt-5-nano` | gpt-5-nano | Water Lilies at Dusk |
| `model-gpt-5-mini` | gpt-5-mini | Boulevard in the Rain |
| `model-gpt-5-4-mini` | gpt-5-4-mini | Field of Poppies |
| `model-gpt-5-4` | gpt-5-4 | Harbor at Sunrise |
| `model-gpt-5-6-luna` | gpt-5-6-luna | Woman with a Parasol |
| `model-gpt-5-6-terra` | gpt-5-6-terra | Haystacks in Golden Light |
| `model-gpt-5-5` | gpt-5-5 | Dance at the Ball |
| `model-gpt-5-6-sol` | gpt-5-6-sol | Montmartre Café Terrace |

## Important: AI Gateway region

AI Gateway is only available in **AWS US East (Ohio) — `aws-us-east-2`**. The auto-created Neon project (`snowy-flower-67159776`) is in `us-west-2` and **cannot** call AI Gateway. To generate real artwork:

1. Create a new project in the [Neon Console](https://console.neon.tech) and select **US East (Ohio)**
2. Copy AI Gateway credentials from Console → Project → AI Gateway
3. Update `.env.local` with the new `DATABASE_URL`, `NEON_PROJECT_ID`, and gateway credentials
4. Run `npm run setup:db && npm run setup:branches && npm run generate`

The gallery ships with SVG placeholder art until you run generation.

## Quick start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Fill in DATABASE_URL, NEON_AI_GATEWAY_TOKEN, NEON_AI_GATEWAY_BASE_URL

# Set up database and branches
npm run setup:db
npm run setup:branches   # requires NEON_API_KEY

# Generate artwork (one image per model, ~2 min each)
npm run generate

# Preview locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel
```

Or connect the repo in the Vercel dashboard. No server-side env vars needed for the static gallery — artwork images are committed to `public/art/` after generation.

## Project structure

```
├── public/art/          # Generated JPEG artwork
├── scripts/
│   ├── generate-art.ts  # AI Gateway image generation
│   ├── setup-branches.ts
│   └── setup-db.ts
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # Gallery, Methodology, MuseumPlaque
│   ├── data/gallery.ts  # Artwork metadata
│   └── lib/models.ts    # Model configs and prompts
```

## How it works

1. **One branch per model** — Each GPT-5 variant gets an isolated Neon branch with its own AI Gateway endpoint
2. **Image generation** — `@neon/ai-sdk-provider` calls `neon.tools.imageGeneration()` via `streamText`
3. **Gallery** — Next.js renders a museum-style slideshow with model attribution plaques
4. **Methodology tab** — Documents the honest framing, branching architecture, and full stack

## License

MIT
