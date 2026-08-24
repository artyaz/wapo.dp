import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

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
            { type: 'text', text: 'Review this design-system website screenshot. Report ONLY concrete visual defects: overlapping text, unreadable text, broken layout, misaligned elements, missing content areas, or error screens. If the page looks clean and professional, reply exactly "CLEAN". Be terse, max 60 words.' },
            { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
          ],
        },
      ],
    });
    console.log(`=== ${f.split('/').pop()} ===`);
    console.log(res.choices[0]?.message?.content);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
