// Copies the pre-drawn news image (entry.png, in this same directory)
// into the grader's output directory as entry.png.
//
// The image was drawn by hand with Python (Pillow) in build/draw.py from
// the world news of Monday 23 November 2026; this program only places the
// finished file where the grader expects it. Node 22 standard library only.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The file must be a real PNG: check its 8-byte magic signature first so a
// truncated or wrong file fails loudly instead of being copied silently.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const src = join(here, "entry.png");
const head = readFileSync(src).subarray(0, 8);
if (!head.equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file (bad magic bytes)");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
console.log(`wrote entry.png (${statSync(src).size} bytes) to ${outDir}`);
