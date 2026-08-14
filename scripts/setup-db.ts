/**
 * Creates the artworks table in Neon Postgres.
 * Run: npm run setup:db
 */
import { neon } from "@neondatabase/serverless";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS artworks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      model_id TEXT NOT NULL,
      branch_name TEXT NOT NULL,
      year TEXT NOT NULL DEFAULT '2026',
      medium TEXT NOT NULL DEFAULT 'Digital impressionism via Neon AI Gateway',
      description TEXT NOT NULL,
      prompt TEXT NOT NULL,
      image_path TEXT NOT NULL,
      palette JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  console.log("✓ artworks table ready");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
