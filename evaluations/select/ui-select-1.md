# Evaluation — Select — ui-select-1

| Field | Value |
| --- | --- |
| Component | Select (`select`) |
| Page | /eval/ui-select-1 |
| Topic | email client inbox zero |
| Viewport | 768x1024 |
| Theme | dark |
| Model | agy-image via https://omni.chmyl.com/v1 |
| Date | 2026-08-29T03:46:16.488Z |
| Verdict | **PASS** |
| Score | 9/10 |

## Screenshot: ui-select-1.png

- Verdict: PASS (score 9/10)

```
VERDICT: PASS
SCORE: 9/10
ISSUES:
1. [minor] Select dropdown popover lacks a distinct elevation/cast shadow against dense underlying email rows (Principle 4 permits cast shadows specifically on true overlays/popovers to cleanly separate floating surfaces from in-flow text).
2. [minor] Mixed type role for numeric data: counts inside the Select dropdown items (`(24)`, `(6)`, etc.) and sidebar badges use Inter (sans), whereas timestamps and footer stats use IBM Plex Mono (Principle 2).
```

