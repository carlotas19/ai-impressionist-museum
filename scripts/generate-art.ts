/**
 * Generates impressionist artwork via Neon AI Gateway for each GPT-5 model.
 * Saves JPEGs to public/art/ and writes metadata to Postgres.
 *
 * Prerequisites:
 *   - Neon project in aws-us-east-2 (Ohio) on a paid plan
 *   - NEON_AI_GATEWAY_TOKEN and NEON_AI_GATEWAY_BASE_URL in .env.local
 *   - DATABASE_URL pointing to the project's main branch
 *
 * Run: npm run generate
 */
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { neon as neonSql } from "@neondatabase/serverless";
import { neon } from "@neon/ai-sdk-provider";
import { streamText } from "ai";
import { GALLERY_MODELS } from "../src/lib/models";
import { gallery } from "../src/data/gallery";

const ART_DIR = join(process.cwd(), "public", "art");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractBase64Image(
  output: unknown,
): string | null {
  if (!output || typeof output !== "object") return null;
  const o = output as Record<string, unknown>;
  if (typeof o.result === "string") return o.result;
  if (typeof o.image === "string") return o.image;
  if (Array.isArray(o.content)) {
    for (const part of o.content) {
      if (part && typeof part === "object" && "result" in part) {
        const r = (part as { result: unknown }).result;
        if (typeof r === "string") return r;
      }
    }
  }
  return null;
}

async function generateForModel(
  modelId: string,
  prompt: string,
): Promise<Buffer | null> {
  const result = streamText({
    model: neon(modelId),
    messages: [{ role: "user", content: prompt }],
    tools: {
      image_generation: neon.tools.imageGeneration({
        outputFormat: "jpeg",
        quality: "low",
        size: "1024x1024",
      }),
    },
  });

  for await (const part of result.fullStream) {
    if (part.type === "tool-result") {
      const base64 = extractBase64Image(part.output);
      if (base64) {
        return Buffer.from(base64, "base64");
      }
    }
  }

  return null;
}

async function main() {
  const gatewayToken = process.env.NEON_AI_GATEWAY_TOKEN;
  const gatewayUrl = process.env.NEON_AI_GATEWAY_BASE_URL;
  const databaseUrl = process.env.DATABASE_URL;

  if (!gatewayToken || !gatewayUrl) {
    console.error(
      "NEON_AI_GATEWAY_TOKEN and NEON_AI_GATEWAY_BASE_URL are required.\n" +
        "Your project must be in aws-us-east-2 (Ohio). Get credentials from:\n" +
        "  Console → Project → AI Gateway → Credentials",
    );
    process.exit(1);
  }

  if (!existsSync(ART_DIR)) {
    mkdirSync(ART_DIR, { recursive: true });
  }

  const sql = databaseUrl ? neonSql(databaseUrl) : null;

  console.log(`Generating ${GALLERY_MODELS.length} artworks...\n`);

  for (const model of GALLERY_MODELS) {
    const artworkMeta = gallery.find((a) => a.modelId === model.modelId);
    const id = artworkMeta?.id ?? slugify(model.subject);
    const filename = `${id}.jpg`;
    const filepath = join(ART_DIR, filename);

    if (existsSync(filepath)) {
      console.log(`  ⊘ ${model.displayName}: ${filename} already exists, skipping`);
      continue;
    }

    process.stdout.write(`  ◌ ${model.displayName}: generating...`);

    try {
      const imageBuffer = await generateForModel(model.modelId, model.prompt);

      if (!imageBuffer) {
        console.log(" failed (no image returned)");
        continue;
      }

      writeFileSync(filepath, imageBuffer);
      console.log(` done → ${filename} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);

      if (sql && artworkMeta) {
        await sql`
          INSERT INTO artworks (id, title, artist, model_id, branch_name, year, medium, description, prompt, image_path, palette)
          VALUES (
            ${artworkMeta.id},
            ${artworkMeta.title},
            ${artworkMeta.artist},
            ${artworkMeta.modelId},
            ${artworkMeta.branchName},
            ${artworkMeta.year},
            ${artworkMeta.medium},
            ${artworkMeta.description},
            ${model.prompt},
            ${artworkMeta.imagePath},
            ${JSON.stringify(artworkMeta.palette)}
          )
          ON CONFLICT (id) DO UPDATE SET
            prompt = EXCLUDED.prompt,
            image_path = EXCLUDED.image_path
        `;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(` failed: ${msg}`);
    }

    // Brief pause between requests to avoid rate limits
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\n✓ Generation complete. Run `npm run dev` to preview the gallery.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
