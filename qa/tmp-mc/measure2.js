(() => {
  const clips = document.querySelectorAll('.group\\/mediaclip');
  const out = [];
  const R = (r) => r && { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  const ov = (a, b) =>
    a && b
      ? Math.round(Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))) +
        'x' +
        Math.round(Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y)))
      : 'n/a';
  clips.forEach((clip, i) => {
    const r = clip.getBoundingClientRect();
    const kids = [...clip.children];
    const label = kids.find((k) => k.className.includes('start-1'));
    const dur = kids.find((k) => k.className.includes('end-1'));
    const capLayer = kids.find((k) => k.className.includes('bg-neutral-100'));
    const hair = clip.querySelector('div.h-px');
    const capText = capLayer ? capLayer.querySelector('span.truncate') : null;
    const inlineLabel = capLayer ? [...capLayer.children].find((k) => k.className.includes('bg-panel')) : null;
    const inlineDur = capLayer ? [...capLayer.children].filter((k) => k.className.includes('bg-panel'))[1] : null;
    const labelR = label ? label.getBoundingClientRect() : null;
    const durR = dur ? dur.getBoundingClientRect() : null;
    const capR = capText ? capText.getBoundingClientRect() : null;
    const iLabelR = inlineLabel ? inlineLabel.getBoundingClientRect() : null;
    const iDurR = inlineDur ? inlineDur.getBoundingClientRect() : null;
    const waveR = hair ? hair.parentElement.getBoundingClientRect() : null;
    const labelTxt = label ? label.textContent : iLabelR ? inlineLabel.textContent : '';
    out.push({
      idx: i,
      kind: capLayer ? 'text' : hair ? 'audio' : 'video',
      root: R(r),
      labelChip: R(labelR),
      inlineLabelChip: R(iLabelR),
      inlineDurChip: R(iDurR),
      durChip: R(durR),
      caption: R(capR),
      labelTxt: (labelTxt || '').slice(0, 24),
      overlaps: {
        labelXdur: ov(labelR, durR),
        labelXcap: ov(labelR, capR),
        iLabelXcap: ov(iLabelR, capR),
        iLabelXcap2: ov(iLabelR, iDurR),
      },
    });
  });
  return JSON.stringify(out);
})()
