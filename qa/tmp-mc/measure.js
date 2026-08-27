(() => {
  const clips = document.querySelectorAll('.group\\/mediaclip');
  const out = [];
  clips.forEach((clip, i) => {
    const r = clip.getBoundingClientRect();
    const kids = [...clip.children];
    const label = kids.find((k) => k.className.includes('max-w-[70%]'));
    const dur = kids.find((k) => k.className.includes('top-1') && k.className.includes('right-1'));
    const capLayer = kids.find((k) => k.className.includes('bg-neutral-100'));
    const hair = clip.querySelector('div.h-px');
    const capText = capLayer ? capLayer.querySelector('span.truncate') : null;
    const labelR = label ? label.getBoundingClientRect() : null;
    const durR = dur ? dur.getBoundingClientRect() : null;
    const capTextR = capText ? capText.getBoundingClientRect() : null;
    const waveR = hair ? hair.parentElement.getBoundingClientRect() : null;
    const ov = (a, b) =>
      a && b
        ? {
            x: Math.round(Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x))),
            y: Math.round(Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))),
          }
        : null;
    out.push({
      idx: i,
      kind: capLayer ? 'text' : hair ? 'audio' : 'video',
      root: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      label: labelR && { x: Math.round(labelR.x), y: Math.round(labelR.y), w: Math.round(labelR.width), h: Math.round(labelR.height) },
      duration: durR && { x: Math.round(durR.x), y: Math.round(durR.y), w: Math.round(durR.width), h: Math.round(durR.height) },
      captionText: capTextR && { x: Math.round(capTextR.x), y: Math.round(capTextR.y), w: Math.round(capTextR.width), h: Math.round(capTextR.height) },
      wave: waveR && { x: Math.round(waveR.x), y: Math.round(waveR.y), w: Math.round(waveR.width), h: Math.round(waveR.height) },
      labelXCaption: ov(labelR, capTextR),
      labelXWave: ov(labelR, waveR),
      labelXDuration: ov(labelR, durR),
      dir: getComputedStyle(clip).direction,
    });
  });
  return JSON.stringify(out);
})()
