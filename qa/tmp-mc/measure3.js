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
    const kids = [...clip.children];
    const label = kids.find((k) => k.className.includes('start-1'));
    const dur = kids.find((k) => k.className.includes('end-1'));
    const capLayer = kids.find((k) => k.className.includes('bg-neutral-100'));
    const hair = clip.querySelector('div.h-px');
    const capVisible = capLayer && getComputedStyle(capLayer).display !== 'none';
    let iLabel = null, iDur = null, capText = null;
    if (capVisible) {
      for (const c of capLayer.children) {
        if (c.className.includes('bg-panel') && c.className.includes('font-body')) iLabel = c;
        else if (c.className.includes('bg-panel') && c.className.includes('font-code')) iDur = c;
        else if (c.className.includes('text-default-font')) capText = c;
      }
    }
    const labelR = label ? label.getBoundingClientRect() : null;
    const durR = dur ? dur.getBoundingClientRect() : null;
    const capR = capText ? capText.getBoundingClientRect() : null;
    const iLabelR = iLabel ? iLabel.getBoundingClientRect() : null;
    const iDurR = iDur ? iDur.getBoundingClientRect() : null;
    out.push({
      idx: i,
      kind: capVisible ? 'text' : hair ? 'audio' : 'video',
      root: R(clip.getBoundingClientRect()),
      cornerLabel: R(labelR),
      cornerDur: R(durR),
      inlineLabel: R(iLabelR),
      inlineDur: R(iDurR),
      caption: R(capR),
      capTxt: (capText ? capText.textContent : '').slice(0, 30),
      overlaps: {
        cornerLabelXdur: ov(labelR, durR),
        cornerLabelXwave: hair ? ov(labelR, hair.parentElement.getBoundingClientRect()) : 'n/a',
        inlineLabelXcap: ov(iLabelR, capR),
        capXinlineDur: ov(capR, iDurR),
        capOutsideRoot: capR
          ? Math.round(Math.max(0, Math.max(capR.x + capR.width - clip.getBoundingClientRect().right, clip.getBoundingClientRect().left - capR.x)))
          : 'n/a',
      },
    });
  });
  return JSON.stringify(out);
})()
