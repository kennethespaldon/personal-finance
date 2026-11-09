// Bundles the backend into a single CommonJS file for deployment.
//
// Vercel's backend packaging moves dist/ files to the function root but leaves
// package.json and node_modules under backend/, so the compiled output can't
// rely on either. Bundling dependencies in and emitting CommonJS removes both
// lookups. See the deployment note in CLAUDE.md.
import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  target: "node26",
  format: "cjs",
  sourcemap: true,
});

// package.json says "type": "module", which would make Node load dist/index.js
// as ESM locally. This marks dist/ as CommonJS so `npm start` works too.
await mkdir("dist", { recursive: true });
await writeFile("dist/package.json", JSON.stringify({ type: "commonjs" }) + "\n");
