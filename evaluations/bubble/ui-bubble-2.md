# Evaluation — Bubble — ui-bubble-2

| Field | Value |
| --- | --- |
| Component | Bubble (`bubble`) |
| Page | /eval/ui-bubble-2 |
| Topic | customer support ticket inbox |
| Viewport | 430x932 |
| Theme | dark |
| Model | agy-image via https://omni.chmyl.com/v1 |
| Date | 2026-08-28T19:40:43.853Z |
| Verdict | **FAIL** |
| Score | 3/10 |

## Screenshot: ui-bubble-2.png

- Verdict: FAIL (score 3/10)

```
VERDICT: FAIL
SCORE: 3/10
ISSUES:
1. [blocker] Top layout clipping and overlap: The header ("Payment failed on renewal", status bar clock), background metadata card ("Last active..."), and the first message bubble group are stacked directly on top of each other, creating unreadable collision.
2. [major] Type role violation (timestamps/data): Message timestamps ("11:02 AM", "11:06 AM", "11:07 AM", "11:18 AM") and ticket identifiers ("Ticket #4821", invoice "INV-2024-0841") are set in sans-serif rather than IBM Plex Mono.
3. [minor] Type role violation (headings): The main ticket heading ("Payment failed on renewal") is rendered in Inter rather than Source Serif 4.
4. [minor] Visual balance / contrast inversion: Agent message bubbles use solid high-luminance light backgrounds in dark mode, creating harsh visual weight imbalances against the muted customer bubbles and dark background.
```

