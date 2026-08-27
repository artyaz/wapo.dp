// Pixel probe: inspect the 8px gap between swatch and hex in qa/screenshots/pair-064.jpg
// (780x840 physical = 390x420 CSS @ DSF 2). Gap columns: x 602..618 physical, swatch row y ~696..720.
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
  const px = (x, y) => Array.from(ctx.getImageData(x, y, 1, 1).data);
  // scan the vertical band of the accent row (y 688..728 physical), columns 570..740
  // report, per 2px column, whether any pixel differs strongly from the modal background
  const cols = [];
  for (let x = 570; x <= 740; x += 2) {
    let darkGlyph = 0, lightGlyph = 0, samples = 0;
    const vals = [];
    for (let y = 688; y <= 728; y += 2) {
      const [r, g, b] = px(x, y);
      samples++;
      vals.push([r, g, b]);
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (lum < 40) darkGlyph++;       // very dark pixels = text glyphs / dark swatch fill
      if (lum > 200) lightGlyph++;     // bright pixels = text glyph in dark theme (light text)
    }
    cols.push({ x, dark: darkGlyph, light: lightGlyph, samples });
  }
  return { w: img.width, h: img.height, cols };
}, `data:image/jpeg;base64,${b64}`);

// summarize ranges
const fmt = res.cols.map(c => `${c.x}:d${c.dark}/l${c.light}`).join("  ");
console.log("img", res.w + "x" + res.h);
console.log("columns x=570..740 (step 2), band y=688..728: dark<40lum count / light>200lum count per column");
console.log(fmt);
await browser.close();
