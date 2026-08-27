# EVAL AGENT GUIDE — Praxis DS automated visual QA (READ FULLY BEFORE WORKING)

You are one of ~180 evaluation subagents. Each of us builds ONE page combining exactly 3 design-system components under specific conditions, screenshots it, and has a vision model audit it for design flaws. Work ONLY on your own pair. Do not touch other pairs' files.

## Your inputs (also given in your task prompt)

- `pairId` — e.g. `pair-017`
- 3 components (id, name, import path, source/demo file paths, exported symbols)
- Conditions: viewport, theme, direction, optional constraint (`no-scroll` / `dense-content`), optional scenario

## Repo facts

- Repo: `/home/z/my-project/wapo.dp` (Next.js 16 + Tailwind 4 + TypeScript). Dev server runs at http://localhost:3000 — never stop/restart it unless it is DOWN, never run `next build`, never `bun install`.
- IF `localhost:3000` is unreachable (connection refused / empty response): restart it once with
  `cd /home/z/my-project/wapo.dp && (setsid nohup bun run dev > /dev/null 2>&1 &)`, wait ~40 s, verify with `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`, then continue. If it is already running but slow during first compile, just be patient (goto timeout is 90 s).
- Do NOT keep your own browser/playwright sessions open — the box has limited RAM. If you open a browser for debugging, close it (browser.close()) immediately after.
- ds components live in `src/components/ds/<Name>/` (component source `<Name>.tsx`, usage examples in `demo.tsx`, API docs in `meta.ts`).
- ui components live in `src/components/ui/<slug>.tsx`; usage examples in `src/components/ui-demos/<slug>/*.tsx`.
- Design language: calm, monochrome, liquid-glass. Semantic color only for success/warning/destructive.

## Step 1 — Study the components (2–4 minutes max)

Read each component's source file(s) and at least one demo file. Demos are the fastest way to learn the real props/usage. Do not guess props — copy patterns from demos and adapt.

## Step 2 — Create your page

Create exactly one file: `src/app/eval/<pairId>/page.tsx` (make the directory).

Mandatory template:

```tsx
"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
// import your 3 components here

export default function Page() {
  return (
    <EvalShell theme="<light|dark>" dir="<ltr|rtl>">
      {/* your composition */}
    </EvalShell>
  );
}
```

Requirements:
- Use ALL 3 assigned components, each rendered meaningfully (not commented out, not 1px small).
- Build a REALISTIC, LOGICAL mini-app screen — e.g. a checkout step, chat panel, settings sheet, player, inspector. The 3 components must be placed where they'd make sense in a real product. Do NOT stack three unrelated demo blocks.
- Respect conditions: `theme` and `dir` go into EvalShell (see pair spec); design FOR the viewport size given (a 390×420 half-phone page is a compact surface — think sheet/dock/inline widget; a 1440×900 page can be a full layout). If constraint `no-scroll`: everything must fit the viewport height without scrolling. If `dense-content`: use realistic long labels/multi-line content so wrap/truncate behavior is visible.
- If a scenario is given, follow it. Otherwise invent a plausible one.
- Use lucide-react icons where demos do. Use Tailwind classes freely; you may use small amounts of supporting chrome (headings, separators, plain text) — the 3 components must remain the stars.
- Prefer static/default-open states. Radix overlays (dialog/popover/dropdown) that need a click will not be open in the screenshot — if you want one open, control it via `defaultOpen`/controlled state if the component supports it; otherwise use its inline/closed state.
- NO page metadata exports, no `getServerSideProps`, no server-only APIs. Keep everything client-side and deterministic.
- Do NOT modify: `src/eval/EvalShell.tsx`, `globals.css`, `next.config.ts`, any component source, `tailwind` config, or any other pair's page. You create exactly ONE new file. (If EvalShell or a component seems genuinely broken, report it — do not fix it in this phase.)

## Step 3 — Capture + audit

Run (this is the ONLY command you need; cwd does not matter):

```
node /home/z/my-project/scripts/capture-eval.mjs <pairId>
```

What it does: screenshots your page under the pair's exact conditions, sends it to the vision auditor, saves `qa/results/<pairId>.json`, prints the issues found. It may take 30–120 s (waits for compile + audit). Exit codes:
- `0` — audited (pass or fail). You are DONE. Go to step 4.
- `2` — your page has a runtime/compile error (details printed). Fix the page, rerun. Max 3 attempts total.
- `3` — vision API error. Just rerun the command (up to 3 times).
- `4` — page route not found: you haven't created the file / wrong pairId.

If after 3 attempts it still errors: leave the page and the `qa/results/<pairId>.json` (page-error results are still valid findings — they indicate a broken component), and say so in your report.

## Step 4 — Worklog + report

1. Read the FIRST 60 lines of `/home/z/my-project/worklog.md` (protocol only — the file is long; do not read it all).
2. APPEND (never overwrite) one entry at the end:

```markdown
---
Task ID: <your task id>
Agent: eval-subagent
Task: build+audit eval page <pairId>

Work Log:
- created src/app/eval/<pairId>/page.tsx (scenario: <one phrase>)
- capture-eval exit <code>; result: <verdict>, <n> issues (<x> blocker / <y> major / <z> minor)

Stage Summary:
- <one line: most important finding, or "clean">
```

3. Report back to your orchestrator, concisely:
   - pairId, final status (evaluated / page-error / failed)
   - issue count by severity + component attribution
   - one-line summary of the top finding (or "clean")
   - anything anomalous (e.g., "component ds:X threw: <error>")
