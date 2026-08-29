# Button Group — evaluations

| Page | Topic | Viewport | Theme | Verdict | Score |
| --- | --- | --- | --- | --- | --- |
| [ui-button-group-1](ui-button-group-1.md) | restaurant reservation system | 1280x800 | dark | PASS | 9/10 |
| [ui-button-group-2](ui-button-group-2.md) | shared travel journal | 834x1112 | light | PASS | 9/10 |
| [ui-button-group-1](ui-button-group-1.md) | restaurant reservation system | 1280x800 | dark | PASS | 9/10 |
| [ui-button-group-2](ui-button-group-2.md) | shared travel journal | 834x1112 | light | PASS | 10/10 * |
| [ui-button-group-2](ui-button-group-2.md) | shared travel journal | 834x1112 | light | PASS | 10/10 * |

\* The two runs for ui-button-group-2 (post-refinement screenshot) were recorded
as "1/10" by `scripts/evaluate.mjs` because its score regex
(`/SCORE:\s*([0-9](?:\.\d+)?)/`) captures a single digit, truncating the model's
actual `SCORE: 10/10` to `1`. The model's verbatim raw output (`VERDICT: PASS,
SCORE: 10/10, ISSUES: none`) is preserved in
[ui-button-group-2.md](ui-button-group-2.md); the scores here are corrected to
match it.
| [ui-button-group-1](ui-button-group-1.md) | restaurant reservation system | 1280x800 | dark | PASS | 10/10 |
