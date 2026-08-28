# Evaluation — Bubble — ui-bubble-1

| Field | Value |
| --- | --- |
| Component | Bubble (`bubble`) |
| Page | /eval/ui-bubble-1 |
| Topic | HR onboarding checklist for new hires |
| Viewport | 390x844 |
| Theme | dark |
| Model | agy-image via https://omni.chmyl.com/v1 |
| Date | 2026-08-28T19:40:36.871Z |
| Verdict | **FAIL** |
| Score | 3/10 |

## Screenshot: ui-bubble-1.png

- Verdict: FAIL (score 3/10)

```
VERDICT: FAIL
SCORE: 3/10
ISSUES:
1. [blocker] Top navigation collision: In-flow chat bubbles ("Heading to the 4th floor...", "line at reception...") render directly over the fixed header, colliding with the back button, progress indicator, DW avatar, and status text. Add proper top content inset/scroll clipping below the header.
2. [minor] Inconsistent timestamp and reaction alignment: The timestamp at 9:47 AM is left-aligned under the reaction emoji, while timestamps for other incoming/outgoing bubbles (10:05 AM, 10:14 AM) are right-aligned, violating grid discipline and vertical rhythm.
3. [minor] Bubble and button geometry: The "Open task in Workday" button and interactive message bubbles exhibit inconsistent corner radii (~4px to ~12px) rather than strictly adhering to the design system's ~3px / ~8px hierarchy.
```

