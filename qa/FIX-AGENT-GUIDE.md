# FIX AGENT GUIDE — Praxis DS defect repair (READ FULLY BEFORE WORKING)

You are one of ~82 fix subagents. Each of us owns exactly ONE component, receives the list of issues auditors found for it during a 180-page vision-model QA run, verifies each issue against the source, and fixes the REAL defects. Work ONLY on your own component. Do NOT spawn further subagents.

## Your inputs (also in your task prompt)

- `componentId` — e.g. `ds:Sheet` or `ui:calendar`
- Path to your issue list: `/home/z/my-project/wapo.dp/qa/by-component/<componentId with : replaced by ->.json` (e.g. `ds-Sheet.json`). It contains `issues` (deduplicated, with `occurrences`, `pairs`, `theme`, `dir`, `viewport` context) and `allIssues` (raw).
- Source locations are listed inside that JSON (`sourceFiles`, `demoFile`, `metaFile`).

## Repo facts

- Repo: `/home/z/my-project/wapo.dp` (Next.js 16 + Tailwind 4 + TypeScript). Dev server at http://localhost:3000 (may flap under load — if unreachable, restart once: `cd /home/z/my-project/wapo.dp && (setsid nohup bun run dev > /dev/null 2>&1 &)`, wait ~40 s, verify with curl).
- Dev server needs ~40 s to (re)compile a route after files change — be patient before judging "broken".
- Docs site (to view your component live): `http://localhost:3000/#/components/<slug>` for ds, `http://localhost:3000/#/ui/<slug>` for ui.
- Design language: calm monochrome liquid-glass; semantic color only for success/warning/destructive. Tokens live in `src/app/globals.css` — READ ONLY, never edit it (shared file; the orchestrator owns it).
- IMPORTANT theme gotcha: the neutral scale INVERTS in dark theme (`neutral-100` is near-black in dark, `neutral-800/900` are light). Hardcoded neutrals or raw hex colors are the usual root cause of dark-theme bugs. Prefer semantic tokens (`text-default-font`, `text-muted-foreground`, `bg-panel`, `border-default-border`) or `dark:` variants.
- The vaul library (used by ds:Drawer / ds:DrawerLayout / ui:drawer) touches `document` during render — SSR crashes are a known pattern; guard with client-only mounting if you own one of these.
- A `mobile:` custom variant now exists (`@media (width < 30rem)`) — added by the orchestrator.

## Hard rules

1. Edit ONLY files inside your component's directory (`src/components/ds/<Name>/` or `src/components/ui/<slug>.tsx`). You may fix the component source, its demo, and its meta docs.
2. NEVER edit: `globals.css`, `next.config.ts`, `tailwind` config, `src/eval/`, `src/app/eval/**` (QA pages), other components, `package.json`.
3. Preserve the public API (props, export names) — demos, docs pages, and eval pages depend on it. Additive changes only.
4. Keep the design language. Fixes should be minimal and surgical.
5. If the root cause provably lives in a file you may not edit, do NOT edit it — describe it in your report as "blocked-external".

## Workflow

### Step 1 — Triage (most important)

For each issue in your list:
1. Read the component source (and demo where relevant).
2. Verify the flaw is REAL in the component (not a page-composition artifact, not an auditor misread). Context fields (`theme`, `dir`, `viewport`) tell you under what condition it appeared; multiple `occurrences` across independent pages = strong signal.
3. Classify each issue: `fix` (real defect, you will fix it) / `false-positive` (code is correct; evidence contradicts, e.g. geometry was verified by the eval agent) / `composition` (flaw was in how the page used the component, e.g. forced-open overlays covering content) / `blocked-external` (root cause outside your files).
4. Update your by-component JSON: add a `"triage"` field to each entry of the `issues` array (`"triage": "fix"|"false-positive"|"composition"|"blocked-external"`, plus `"triageNote": "one sentence"`). Write the file back.

### Step 2 — Fix

For each `fix` issue, implement the smallest correct change. Common patterns that work in this codebase:
- RTL: replace physical utilities with logical ones (`pl-*`→`ps-*`, `pr-*`→`pe-*`, `ml-*`→`ms-*`, `mr-*`→`me-*`, `left-*`→`start-*`, `right-*`→`end-*`, `border-l-*`→`border-s-*`, `rounded-l-*`→`rounded-s-*`, `text-left`→`text-start`, `text-right`→`text-end`). For transforms that must mirror (e.g. switch thumbs), use `rtl:` variants. For code/numbers/timestamps inside RTL pages, isolate with `dir="ltr"` or `<bdi>`/`unicode-bidi` where the content is inherently LTR.
- Dark theme: replace hardcoded hex/neutral classes with tokens, or add `dark:` counterparts.
- Truncation/overflow: add `min-w-0`/`truncate`/`overflow-hidden`/`whitespace-nowrap` where content clips badly; ensure flex children can shrink.
- Spacing collisions: add explicit `gap-*` or padding where sibling elements collide.
- Contrast: step muted text tokens up one level in the failing theme.

### Step 3 — Verify

1. Ensure the dev server compiles your component cleanly: load a page that uses it — your issue list's `pairs` field gives eval page ids (`http://localhost:3000/eval/<pairId>`; the route must return content, not an error overlay). A `curl -s -o /dev/null -w "%{http_code}"` 200 plus no "nextjs error" text is the bar. The docs page `#/components/<slug>` or `#/ui/<slug>` is another check.
2. Optional visual re-audit (max 2 runs total): `node /home/z/my-project/scripts/capture-eval.mjs <pairId>` re-screenshots + re-audits that pair (overwrites its qa/results JSON — that is fine; issues are already aggregated). Use a pair whose conditions match your fix (dark/RTL/phone) and which features your component prominently. Compare issues before/after.
3. If a page using your component fails to compile because of YOUR edit, fix it before finishing.

### Step 4 — Worklog + report

1. Read the FIRST 60 lines of `/home/z/my-project/worklog.md`, then APPEND (never overwrite):

```markdown
---
Task ID: <your task id>
Agent: fix-subagent
Task: fix <componentId>

Work Log:
- triaged N issues: X fix / Y false-positive / Z composition / W blocked-external
- <one line per applied fix: file + what changed>
- verification: <how you confirmed — page 200 / re-audit results>

Stage Summary:
- <key fixes in one line, or "no real defects; all findings false positives">
```

2. Report back to the orchestrator concisely:
   - componentId, triage counts (fix/false-positive/composition/blocked-external)
   - files changed + one line per fix
   - verification result
   - anything blocked-external (root cause in shared files)
