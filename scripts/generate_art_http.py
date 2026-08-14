#!/usr/bin/env python3
"""Generate gallery art via Neon AI Gateway (OpenAI Responses image_generation tool).

Reads credentials from .env.local. Does not print secrets.
Usage: python3 scripts/generate_art_http.py
"""
from __future__ import annotations

import base64
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ART_DIR = ROOT / "public" / "art"
ENV_FILE = ROOT / ".env.local"

MODELS = [
    {
        "model_id": "gpt-5-nano",
        "id": "water-lilies-dusk",
        "title": "Water Lilies at Dusk",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "A tranquil pond covered in water lilies at dusk, with reflections of violet and gold "
            "sky on still water. Soft atmospheric perspective."
        ),
    },
    {
        "model_id": "gpt-5-mini",
        "id": "boulevard-rain",
        "title": "Boulevard in the Rain",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "A Parisian boulevard after rain, gas lamps glowing, umbrellas in motion, wet "
            "cobblestones reflecting amber light."
        ),
    },
    {
        "model_id": "gpt-5-4-mini",
        "id": "field-poppies",
        "title": "Field of Poppies",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "A sun-drenched field of red poppies bending in a summer breeze, distant farmhouse, "
            "cerulean sky with wispy clouds."
        ),
    },
    {
        "model_id": "gpt-5-4",
        "id": "harbor-sunrise",
        "title": "Harbor at Sunrise",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "A fishing harbor at sunrise, boats at anchor, masts silhouetted against peach and "
            "lavender morning light on calm water."
        ),
    },
    {
        "model_id": "gpt-5-6-luna",
        "id": "woman-parasol",
        "title": "Woman with a Parasol",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "A woman standing on a grassy hill holding a white parasol, wind in her dress, "
            "dappled sunlight through scattered clouds."
        ),
    },
    {
        "model_id": "gpt-5-6-terra",
        "id": "haystacks-golden",
        "title": "Haystacks in Golden Light",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "Two haystacks in a rural field bathed in late-afternoon golden light, long shadows, "
            "warm ochre and amber tones."
        ),
    },
    {
        "model_id": "gpt-5-5",
        "id": "dance-ball",
        "title": "Dance at the Ball",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "An elegant ballroom scene with dancers in motion, chandeliers overhead, silk gowns "
            "swirling in soft candlelight."
        ),
    },
    {
        "model_id": "gpt-5-6-sol",
        "id": "montmartre-cafe",
        "title": "Montmartre Café Terrace",
        "prompt": (
            "Create an impressionist oil painting in the style of Monet, Renoir, or Pissarro. "
            "Use visible brushstrokes, soft diffused light, and a vibrant but harmonious palette. "
            "A Montmartre café terrace at twilight, small round tables, warm interior glow "
            "spilling onto the cobblestone street."
        ),
    },
]


def load_env(path: Path) -> dict[str, str]:
    env: dict[str, str] = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def extract_images(payload: dict) -> list[bytes]:
    images: list[bytes] = []

    def consider(b64: str) -> None:
        if not b64 or not isinstance(b64, str):
            return
        try:
            images.append(base64.b64decode(b64))
        except Exception:
            pass

    # Non-streaming response shape
    for item in payload.get("output") or []:
        if not isinstance(item, dict):
            continue
        if item.get("type") == "image_generation_call":
            consider(item.get("result") or "")
        for content in item.get("content") or []:
            if isinstance(content, dict):
                if content.get("type") in ("output_image", "image"):
                    consider(content.get("image_base64") or content.get("b64_json") or content.get("result") or "")
                if "result" in content:
                    consider(content.get("result") or "")

    return images


def generate_one(base_url: str, token: str, model_id: str, prompt: str) -> bytes:
    url = f"{base_url.rstrip('/')}/openai/v1/responses"
    body = {
        "model": model_id,
        "input": prompt,
        "tools": [
            {
                "type": "image_generation",
                "quality": "low",
                "size": "1024x1024",
                "output_format": "jpeg",
            }
        ],
        "tool_choice": {"type": "image_generation"},
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=180) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code}: {err_body[:800]}") from e

    images = extract_images(payload)
    if images:
        # Prefer the largest (usually the final) image
        images.sort(key=len, reverse=True)
        return images[0]

    # Fallback: dump structure keys for debugging (no secrets)
    keys = list(payload.keys())
    out_types = []
    for item in payload.get("output") or []:
        if isinstance(item, dict):
            out_types.append(item.get("type"))
    raise RuntimeError(f"No image in response. keys={keys} output_types={out_types}")


def main() -> int:
    if not ENV_FILE.exists():
        print(f"Missing {ENV_FILE}", file=sys.stderr)
        return 1

    env = load_env(ENV_FILE)
    token = env.get("NEON_AI_GATEWAY_TOKEN")
    base = env.get("NEON_AI_GATEWAY_BASE_URL")
    if not token or not base:
        print("NEON_AI_GATEWAY_TOKEN and NEON_AI_GATEWAY_BASE_URL required", file=sys.stderr)
        return 1

    ART_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Generating {len(MODELS)} artworks via {base}")

    ok = 0
    for i, model in enumerate(MODELS, 1):
        out = ART_DIR / f"{model['id']}.jpg"
        if out.exists() and out.stat().st_size > 10_000:
            print(f"[{i}/{len(MODELS)}] skip {model['model_id']} → {out.name} exists")
            ok += 1
            continue
        print(f"[{i}/{len(MODELS)}] {model['model_id']} — {model['title']} ...", flush=True)
        try:
            jpeg = generate_one(base, token, model["model_id"], model["prompt"])
            out.write_bytes(jpeg)
            print(f"  saved {out.name} ({len(jpeg)/1024:.0f} KB)")
            ok += 1
        except Exception as e:
            print(f"  FAILED: {e}")
        if i < len(MODELS):
            time.sleep(2)

    print(f"Done: {ok}/{len(MODELS)} images ready in {ART_DIR}")
    return 0 if ok == len(MODELS) else 2


if __name__ == "__main__":
    raise SystemExit(main())
