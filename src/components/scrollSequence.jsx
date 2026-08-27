import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Frames live in public/ so they are fetched by URL instead of being bundled
// by webpack as one module import per frame.
const framePath = (dir, n) =>
  `${process.env.PUBLIC_URL}/${dir}/frame_${String(n).padStart(4, '0')}.webp`;

// Enough frames to cover the first stretch of scrubbing before we reveal the
// canvas. The default set runs at 60fps, so 24 frames buys about 0.4s of
// animation (~160px of scroll) for ~1MB. The rest stream in behind the loader.
const FIRST_BATCH = 24;

// Retina is worth it, 3x+ is not: the frames are 1280x720, so a backing store
// wider than about 2560px is upscaling an image we do not have the detail for
// while paying full price in memory.
const MAX_DPR = 2;

// Decoded bitmaps dominate this component's memory: width x height x 4 bytes
// per frame, held for as long as the Image objects are alive. At 1280x720 that
// is 3.7MB a frame, so the full 476-frame set is ~1.75GB if the browser keeps
// all of it. Sample every other frame on small screens, where the ceiling is
// lowest and the canvas is smallest anyway.
const MOBILE_QUERY = '(max-width: 767px)';

// Copy beats, positioned as a fraction of the scrub. `until: null` keeps the
// caption on screen through the end of the pin instead of fading it out.
const CAPTIONS = [
  {
    at: 0.02,
    until: 0.22,
    pos: 'bottom-left',
    kicker: '01 · Fresh daily',
    head: 'Baked the morning of',
    body: 'Never the night before, never reheated. Your event decides when we start the oven.',
  },
  {
    at: 0.28,
    until: 0.46,
    pos: 'mid-right',
    kicker: '02 · Made by hand',
    head: 'Pulled apart, not sliced',
    body: 'Fifty-four folds of butter and flour. You can hear when it is right.',
  },
  {
    at: 0.52,
    until: 0.7,
    pos: 'mid-left',
    kicker: '03 · Timed to you',
    head: 'Still steaming on arrival',
    body: 'We time every bake around your schedule, then bring it to you warm.',
  },
  {
    at: 0.76,
    until: null,
    pos: 'center',
    // The script face is the site's existing brand device. Held back for the
    // payoff beat so it lands rather than decorates.
    script: true,
    kicker: '04 · The promise',
    head: 'Cateron.',
    body: 'Catering and event planning across every occasion. You relax, we handle the rest.',
  },
];

const CAPTION_FADE = 0.05;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ScrollSequence = ({
  framesDir = 'baked_frames',
  frameCount = 476,
  scrollDistance = '+=300%',
  scrub = 0.5,
  fit = 'cover',
  label = 'A pastry cracking open, animated as the page scrolls',
}) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);

  const captionRefs = useRef([]);

  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const imagesRef = useRef(null);
  const lastFrameRef = useRef(0);

  // Index list is built once, at the width the page loaded at. On phones we
  // sample every other frame, which halves both the network cost and the
  // decoded-bitmap footprint. Rebuilding it on resize would restart the whole
  // preload mid-scroll, so a rotated phone keeps the set it started with.
  const indicesRef = useRef(null);
  if (indicesRef.current === null) {
    const step =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia(MOBILE_QUERY).matches
        ? 2
        : 1;
    const indices = [];
    for (let n = 1; n <= frameCount; n += step) indices.push(n);
    indicesRef.current = indices;
  }
  const total = indicesRef.current.length;

  const [ready, setReady] = useState(false);
  const [percent, setPercent] = useState(0);

  // Sizes the backing store to the CSS box x DPR. Returns true when the canvas
  // was actually reallocated (which wipes it, so the caller must redraw).
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (!w || !h) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const bw = Math.round(w * dpr);
    const bh = Math.round(h * dpr);
    if (canvas.width === bw && canvas.height === bh) return false;

    canvas.width = bw;
    canvas.height = bh;

    const ctx = canvas.getContext('2d');
    // Draw in CSS pixels; the transform handles the device ratio.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctxRef.current = ctx;
    sizeRef.current = { w, h };
    return true;
  }, []);

  const drawFrame = useCallback(
    (index) => {
      const images = imagesRef.current;
      const ctx = ctxRef.current;
      if (!images || !ctx) return;

      const img = images[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      const scale =
        fit === 'contain'
          ? Math.min(w / img.naturalWidth, h / img.naturalHeight)
          : Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    },
    [fit]
  );

  // ---- preload -------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    const indices = indicesRef.current;
    const images = new Array(total);
    imagesRef.current = images;

    let loaded = 0;
    let lastPercent = -1;

    const loadOne = (slot) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.alt = '';
        const done = () => {
          loaded += 1;
          if (!cancelled) {
            const next = Math.round((loaded / total) * 100);
            // One setState per whole percent instead of one per image.
            if (next !== lastPercent) {
              lastPercent = next;
              setPercent(next);
            }
            // Paint the poster the moment the very first frame lands.
            if (slot === 0) {
              resizeCanvas();
              drawFrame(0);
            }
          }
          resolve();
        };
        img.onload = done;
        img.onerror = done;
        img.src = framePath(framesDir, indices[slot]);
        images[slot] = img;
      });

    const head = [];
    for (let i = 0; i < Math.min(FIRST_BATCH, total); i += 1) head.push(loadOne(i));

    Promise.all(head).then(() => {
      if (cancelled) return;
      setReady(true);
      resizeCanvas();
      drawFrame(lastFrameRef.current);
      for (let i = FIRST_BATCH; i < total; i += 1) loadOne(i);
    });

    return () => {
      cancelled = true;
      // Drop every decoded bitmap: detach handlers, then release the source so
      // the browser can reclaim the image cache instead of holding ~177MB.
      if (imagesRef.current) {
        for (let i = 0; i < imagesRef.current.length; i += 1) {
          const img = imagesRef.current[i];
          if (!img) continue;
          img.onload = null;
          img.onerror = null;
          // removeAttribute, not src = '': an empty src resolves against the
          // document URL and fires a spurious request for the page itself.
          img.removeAttribute('src');
        }
      }
      imagesRef.current = null;
      ctxRef.current = null;
    };
  }, [total, framesDir, resizeCanvas, drawFrame]);

  // ---- scrub ---------------------------------------------------------------
  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return undefined;

      resizeCanvas();
      drawFrame(lastFrameRef.current);

      const redraw = () => {
        resizeCanvas();
        drawFrame(lastFrameRef.current);
      };

      const captions = captionRefs.current;

      // Reduced motion: no pin, no scrub. Hold a single representative frame and
      // let the captions fall into a static stack, so nothing is lost to a
      // reader who never sees the scrub.
      if (prefersReducedMotion()) {
        const still = Math.floor(total * 0.66);
        lastFrameRef.current = still;
        drawFrame(still);
        section.classList.add('cr-sequence--static');
        ScrollTrigger.addEventListener('refresh', redraw);
        window.addEventListener('resize', redraw);
        return () => {
          section.classList.remove('cr-sequence--static');
          ScrollTrigger.removeEventListener('refresh', redraw);
          window.removeEventListener('resize', redraw);
        };
      }

      const playhead = { frame: 0 };

      // One timeline, one ScrollTrigger: the captions read their position from
      // the same scrub as the frames, so copy and image can never drift apart.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: scrollDistance,
          scrub: scrub,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Duration 1 makes every other position on this timeline a plain
      // fraction of the scroll.
      tl.to(
        playhead,
        {
          frame: total - 1,
          ease: 'none',
          duration: 1,
          onUpdate: () => {
            const index = Math.round(playhead.frame);
            // scrub ticks far more often than the frame index changes; skipping
            // the redundant draws is most of the 60fps budget.
            if (index === lastFrameRef.current) return;
            lastFrameRef.current = index;
            drawFrame(index);
          },
        },
        0
      );

      captions.forEach((el, i) => {
        const beat = CAPTIONS[i];
        if (!el || !beat) return;

        // The figure carries the scrim, so fading it takes the backdrop with
        // the text. opacity rather than autoAlpha: visibility:hidden would pull
        // the copy out of the accessibility tree, and all four beats should be
        // readable in order.
        tl.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: CAPTION_FADE, ease: 'none' },
          beat.at
        );

        // Kicker, head and body arrive in sequence rather than as one block.
        tl.fromTo(
          el.querySelectorAll('[data-line]'),
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            duration: CAPTION_FADE,
            ease: 'power3.out',
            stagger: CAPTION_FADE * 0.32,
          },
          beat.at
        );

        if (beat.until !== null) {
          tl.to(
            el,
            { opacity: 0, y: -30, duration: CAPTION_FADE, ease: 'power2.in' },
            beat.until
          );
        }
      });

      // Pin geometry is measured on refresh, so resize the backing store there
      // rather than racing it from a separate resize listener.
      ScrollTrigger.addEventListener('refreshInit', redraw);
      ScrollTrigger.addEventListener('refresh', redraw);

      // Mobile browsers fire resize when the URL bar collapses. Refreshing on
      // that height change makes the pin jump, so only react to width changes.
      let lastWidth = window.innerWidth;
      let resizeTimer = null;
      const onResize = () => {
        if (window.innerWidth === lastWidth) {
          redraw();
          return;
        }
        lastWidth = window.innerWidth;
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          redraw();
          ScrollTrigger.refresh();
        }, 150);
      };
      window.addEventListener('resize', onResize);

      return () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        window.removeEventListener('resize', onResize);
        ScrollTrigger.removeEventListener('refreshInit', redraw);
        ScrollTrigger.removeEventListener('refresh', redraw);
      };
    },
    {
      scope: sectionRef,
      dependencies: [total, scrollDistance, scrub, resizeCanvas, drawFrame],
      revertOnUpdate: true,
    }
  );

  // Repaint once the first batch is in, in case the tween settled first.
  useEffect(() => {
    if (ready) drawFrame(lastFrameRef.current);
  }, [ready, drawFrame]);

  return (
    <section ref={sectionRef} className="cr-sequence">
      <div ref={stageRef} className="cr-sequence__stage">
        <canvas
          ref={canvasRef}
          className="cr-sequence__canvas"
          role="img"
          aria-label={label}
        />

        <div className="cr-sequence__copy">
          {CAPTIONS.map((beat, i) => (
            <div
              key={beat.head}
              className={`cr-sequence__slot cr-sequence__slot--${beat.pos}`}
            >
              <figure
                className={
                  'cr-sequence__caption' +
                  (beat.pos === 'center' ? ' cr-sequence__caption--center' : '') +
                  (beat.script ? ' cr-sequence__caption--script' : '')
                }
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
              >
                <span className="cr-sequence__caption-kicker" data-line="">
                  {beat.kicker}
                </span>
                <h2 className="cr-sequence__caption-head" data-line="">
                  {beat.head}
                </h2>
                <figcaption className="cr-sequence__caption-body" data-line="">
                  {beat.body}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        {!ready && (
          <div className="cr-sequence__loader" aria-live="polite">
            <div className="cr-sequence__loader-track">
              <div
                className="cr-sequence__loader-bar"
                style={{ transform: `scaleX(${Math.max(percent, 2) / 100})` }}
              />
            </div>
            <span className="cr-sequence__loader-text">Loading {percent}%</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollSequence;
