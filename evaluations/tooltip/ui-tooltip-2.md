# Evaluation — Tooltip — ui-tooltip-2

| Field | Value |
| --- | --- |
| Component | Tooltip (`tooltip`) |
| Page | /eval/ui-tooltip-2 |
| Topic | warehouse inventory console |
| Viewport | 1920x1080 |
| Theme | dark |
| Model | agy-image via https://omni.chmyl.com/v1 |
| Date | 2026-08-29T06:02:01.121Z |
| Verdict | **PASS** |
| Score | 9/10 |

## Screenshot: ui-tooltip-2.png

- Verdict: PASS (score 9/10)

```
VERDICT: PASS
SCORE: 9/10

ISSUES:
1. [minor] Table header alignment (Main Inventory Table): Numeric column headers "On hand" and "Reserved" are left-aligned while their corresponding data values are right-aligned, breaking vertical grid rhythm.
2. [minor] Tooltip anchor positioning (Top-right header): The "Last synced 14:32..." tooltip floats detached below the sync button without an anchor pointer or tight optical proximity to its trigger icon.
3. [minor] Floating overlay elevation (Tooltips): Tooltip components rely on flat inverted white fill without subtle overlay shadow styling specified for floating surfaces in Principle 4.
```

