import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const PROMPT = `You are verifying a "liquid glass" UI implementation. This screenshot shows glass cards over a photographic backdrop (sky gradient, hills, stripes, color spots). The page has 4 rows:
1. material ramp: 4 cards labeled ultrathin/thin/regular/thick
2. frost rows: 4 cards labeled frost 0/10/18/24
3. finish rows: cards labeled border 0, border 1, shadow 0, shadow 2
4. a wide capsule "liquid glass capsule - pull me"

Check and report concisely:
A. Do the glass cards render as translucent glass (backdrop visible through them) rather than opaque panels?
B. Row 2: does blur visibly INCREASE across frost 0 -> 10 -> 18 -> 24, with edges softer than centers (progressive blur)?
C. Row 3: can you see a thin border/rim line difference between "border 0" and "border 1" cards? Does "shadow 2" have a visibly darker drop shadow than "shadow 0"?
D. Any broken rendering: black boxes, empty/invisible cards, harsh rectangle edges, missing rows, overlapping text, error messages?
Answer each of A-D with YES/NO plus one short sentence. Then verdict line: PASS or FAIL.`;

async function main() {
  const zai = await ZAI.create();
  const files = process.argv.slice(2);
  for (const f of files) {
    const b64 = fs.readFileSync(f).toString('base64');
    const res = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: PROMPT },
            { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
          ],
        },
      ],
    });
    console.log(`=== ${f.split('/').pop()} ===`);
    console.log(res.choices[0]?.message?.content);
    console.log();
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
