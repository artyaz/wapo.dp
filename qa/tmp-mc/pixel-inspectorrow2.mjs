// Pixel probe #2: detect swatch (mid-gray ~lum140) vs glyphs (lum>200) vs bg (lum<40)
// in the accent row band of qa/screenshots/pair-064.jpg (780x840, DSF 2).
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("/home/z/.npm-global/lib/node_modules/playwright");
import fs from "node:fs";

const b64 = fs.readFileSync("/home/z/my-project/wapo.dp/qa/screenshots/pair-064.jpg").toString("base64");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 100 } });
await page.goto("about:blank");
const res = await page.evaluate(async (dataUrl) => {
  const img = new Image();
  await new Promise((ok, bad) => { img.onload = ok; img.onerror = bad; img.src = dataUrl; });
  const c = document.createElement("canvas");
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const band = ctx.getImageData(560, 690, 200, 36).data; // x 560..760, y 690..726
  const out = [];
  for (let x = 560; x < 760; x += 1) {
    let mid = 0, light = 0, n = 0;
    for (let y = 690; y < 726; y++) {
      const i = ((y - 690) * 200 + (x - 560)) * 4;
      const lum = 0.2126 * band[i] + 0.7152 * band[i + 1] + 0.0722 * band[i + 2];
      n++;
      if (lum >= 95 && lum <= 190) mid++;      // swatch fill / borders (neutral-500 ~140, default-border ~100-150)
      if (lum > 190) light++;                   // glyph pixels (light text)
    }
    out.push({ x, mid, light });
  }
  return out;
}, `data:image/jpeg;base64,${b64}`);

// print compact: for each column, flag M if mid>=3 (swatch-ish), G if light>=2 (glyph)
let line = "";
for (const c of res) {
  const ch = c.mid >= 3 ? "M" : c.light >= 2 ? "G" : ".";
  line += ch;
}
console.log("x=560 .........................|760, 1 char per column  (M=swatch/border, G=glyph, .=bg)");
console.log(line);
const firstGlyph = res.find((c) => c.light >= 2)?.x;
const lastMid = Math.max(...res.filter((c) => c.mid >= 3 && c.x < 610).map((c) => c.x));
console.log(`first glyph column: ${firstGlyph}, last swatch-ish column below 610: ${lastMid}, visual gap px: ${firstGlyph - lastMid - 1}`);
await browser.close();
