// Next's static export joins segment paths with the OS separator, so on Windows
// `__next.(site).$d$lang.__PAGE__.txt` lands as nested folders instead of one
// file and client-side prefetches 404. Flatten them back. No-op on Linux/macOS.
import { promises as fs } from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) await flatten(full, dir);
    else await walk(full);
  }
}

async function flatten(segDir, parent) {
  const files = [];
  const collect = async (d) => {
    for (const e of await fs.readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await collect(p);
      else files.push(p);
    }
  };
  await collect(segDir);
  for (const file of files) {
    const rel = path.relative(parent, file).split(path.sep).join(".");
    await fs.rename(file, path.join(parent, rel));
  }
  await fs.rm(segDir, { recursive: true, force: true });
}

await walk(OUT);
