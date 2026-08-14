/**
 * Creates one Neon branch per GPT-5 model variant.
 * Requires NEON_API_KEY and NEON_PROJECT_ID.
 * Run: npm run setup:branches
 */
import { GALLERY_MODELS } from "../src/lib/models";

const NEON_API = "https://console.neon.tech/api/v2";

async function neonFetch(path: string, options: RequestInit = {}) {
  const apiKey = process.env.NEON_API_KEY;
  if (!apiKey) throw new Error("NEON_API_KEY is required");

  const res = await fetch(`${NEON_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Neon API ${res.status}: ${body}`);
  }

  return res.json();
}

async function getMainBranchId(projectId: string): Promise<string> {
  const data = await neonFetch(`/projects/${projectId}/branches`);
  const main = data.branches?.find(
    (b: { name: string; default: boolean }) => b.default || b.name === "main",
  );
  if (!main) throw new Error("Could not find main branch");
  return main.id;
}

async function main() {
  const projectId = process.env.NEON_PROJECT_ID;
  if (!projectId) {
    console.error("NEON_PROJECT_ID is required");
    process.exit(1);
  }

  const parentId = await getMainBranchId(projectId);
  console.log(`Parent branch: ${parentId}`);

  for (const model of GALLERY_MODELS) {
    try {
      const existing = await neonFetch(
        `/projects/${projectId}/branches?name=${model.branchName}`,
      );
      if (existing.branches?.length > 0) {
        console.log(`  ✓ Branch "${model.branchName}" already exists`);
        continue;
      }
    } catch {
      // branch list by name may not be supported; try create
    }

    try {
      const result = await neonFetch(`/projects/${projectId}/branches`, {
        method: "POST",
        body: JSON.stringify({
          branch: { name: model.branchName, parent_id: parentId },
          endpoints: [{ type: "read_write" }],
        }),
      });
      console.log(
        `  ✓ Created branch "${model.branchName}" (${result.branch?.id})`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("already exists")) {
        console.log(`  ✓ Branch "${model.branchName}" already exists`);
      } else {
        console.error(`  ✗ Failed to create "${model.branchName}": ${msg}`);
      }
    }
  }

  console.log("\nDone. Each branch now has its own AI Gateway endpoint.");
  console.log(
    "Get branch endpoints from the Neon Console → Branches → AI Gateway.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
