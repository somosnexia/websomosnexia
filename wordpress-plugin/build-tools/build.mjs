import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../nexia-elementor-widgets/assets/js");

const entries = [
  { in: "src/hero-scene.js", out: "nexia-hero-scene.bundle.js" },
];

for (const entry of entries) {
  await esbuild.build({
    entryPoints: [path.join(__dirname, entry.in)],
    outfile: path.join(outDir, entry.out),
    bundle: true,
    minify: true,
    format: "iife",
    target: "es2018",
    logLevel: "info",
  });
}

console.log("Bundles listos en", outDir);
