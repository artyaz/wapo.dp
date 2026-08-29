#!/usr/bin/env node
/** probe-chart.mjs — round-2 probe: tooltip spacing (p1) + legend swatch differentiation (p2). */
import { chromium } from "playwright";

const base = "http://localhost:3000";

const browser = await chromium.launch();
try {
  // ---------- Page 1: tooltip geometry ----------
  {
    const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
    await page.goto(`${base}/eval/ui-chart-1`, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate(() => {
      const el = document.querySelector("[data-eval-theme='dark']");
      document.documentElement.classList.toggle("dark", el?.getAttribute("data-eval-theme") === "dark");
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);
    const r = await page.evaluate(() => {
      const wrappers = [...document.querySelectorAll(".recharts-tooltip-wrapper")].filter(
        (w) => w.childElementCount > 0 && w.getBoundingClientRect().width > 0
      );
      const out = [];
      for (const w of wrappers) {
        const root = w.firstElementChild; // ChartTooltipContent root
        const label = root.querySelector("span.text-muted-foreground");
        const value = root.querySelector("span.font-code");
        if (!label || !value) continue;
        const rr = root.getBoundingClientRect();
        const lr = label.getBoundingClientRect();
        const vr = value.getBoundingClientRect();
        const cs = getComputedStyle(root);
        out.push({
          rootW: +rr.width.toFixed(1),
          rootH: +rr.height.toFixed(1),
          labelText: label.textContent,
          valueText: value.textContent,
          labelValueGap: +(vr.left - lr.right).toFixed(1),
          leftPad: +(lr.left - rr.left).toFixed(1),
          rightPad: +(rr.right - vr.right).toFixed(1),
          cssPadding: cs.padding,
          cssMinWidth: cs.minWidth,
        });
      }
      return out;
    });
    console.log("P1_TOOLTIPS " + JSON.stringify(r, null, 1));
    await page.close();
  }

  // ---------- Page 2: legend markers ----------
  {
    const page = await browser.newPage({ viewport: { width: 834, height: 1112 } });
    await page.goto(`${base}/eval/ui-chart-2`, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate(() => {
      document.documentElement.classList.toggle("dark", true);
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);
    const r = await page.evaluate(() => {
      // ChartLegendContent root: flex items-center justify-center gap-4 (pt-3 when bottom)
      const legends = [...document.querySelectorAll("div")].filter((d) => {
        const c = d.className ? String(d.className).split(" ") : [];
        return c.includes("justify-center") && c.includes("gap-4");
      });
      const out = [];
      for (const root of legends) {
        const items = [...root.children].map((item) => {
          const marker = item.firstElementChild;
          const mcs = marker ? getComputedStyle(marker) : null;
          return {
            text: item.textContent.trim(),
            markerTag: marker?.tagName,
            markerClass: marker?.getAttribute("class"),
            markerW: marker ? +marker.getBoundingClientRect().width.toFixed(1) : null,
            markerH: marker ? +marker.getBoundingClientRect().height.toFixed(1) : null,
            markerBg: mcs?.backgroundColor || null,
            markerHtml: marker?.outerHTML?.slice(0, 220) || null,
          };
        });
        out.push({ items });
      }
      // tooltip markers (icons replace indicator dots when config.icon set)
      const tooltips = [...document.querySelectorAll(".recharts-tooltip-wrapper")]
        .filter((w) => w.childElementCount > 0 && w.getBoundingClientRect().width > 0)
        .map((w) => {
          const rows = [...w.firstElementChild.querySelectorAll("span.text-muted-foreground")].map(
            (s) => {
              const row = s.closest("div.flex.w-full");
              const marker = row?.firstElementChild;
              return {
                name: s.textContent,
                markerTag: marker?.tagName,
                markerHtml: marker?.outerHTML?.slice(0, 200) || null,
              };
            }
          );
          return { rows };
        });
      const lines = [...document.querySelectorAll(".recharts-layer.recharts-line")].map((l) => {
        const path = l.querySelector("path");
        return { cls: l.getAttribute("class"), dash: path?.getAttribute("stroke-dasharray") };
      });
      return { legends: out, tooltips, lineLayers: lines };
    });
    console.log("P2_LEGEND " + JSON.stringify(r, null, 1));
    await page.close();
  }
} finally {
  await browser.close();
}
