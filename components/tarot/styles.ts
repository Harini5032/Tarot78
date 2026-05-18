// All scoped tarot styles. Loaded once via a <style> tag on the page.
// Replaces the original standalone HTML's CSS while keeping every visual cue.
// The reading mat is reproduced with CSS; the card back / page backdrop use
// the provided background.png artwork (DECK_BACKGROUND).

import { DECK_BACKGROUND } from "./card-images"

const CARD_BACK_BG = `
  url("${DECK_BACKGROUND}") center/cover no-repeat,
  linear-gradient(160deg, #0d3d3a 0%, #0a2a2a 60%, #061d1d 100%)
`

const MAT_BG = `
  radial-gradient(ellipse at 50% 50%, rgba(46,184,160,0.18) 0%, transparent 55%),
  radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%),
  repeating-radial-gradient(circle at 50% 50%, rgba(168,232,223,0.04) 0 1px, transparent 1px 24px),
  linear-gradient(140deg, #0e3936 0%, #0a2a2a 55%, #06201f 100%)
`

export const TAROT_STYLES = `
  :root {
    --teal-dark:   #0a2a2a;
    --teal-mid:    #0d3d3a;
    --teal-accent: #1a7a6e;
    --teal-bright: #2eb8a0;
    --teal-glow:   rgba(46,184,160,0.35);
    --cream:       #f5f0e8;
    --cream-dim:   #c8bfa8;
    --gold:        #c9a84c;
    --gold-glow:   rgba(201,168,76,0.4);
    --text-light:  #e8f5f3;
    --text-muted:  #7ab8b0;
  }

  html, body {
    background: var(--teal-dark);
    font-family: var(--font-eb-garamond), Georgia, serif;
    color: var(--text-light);
    overflow-x: hidden;
  }
  body::before {
    content: "";
    position: fixed; inset: 0;
    background:
      radial-gradient(ellipse at 50% 30%, rgba(10,42,42,0.55) 0%, rgba(6,29,29,0.92) 70%),
      url("${DECK_BACKGROUND}") center/cover no-repeat fixed;
    z-index: 0;
    pointer-events: none;
  }

  /* ── STARFIELD ── */
  #starfield {
    position: fixed; inset: 0;
    pointer-events: none; z-index: 0; overflow: hidden;
  }
  .star {
    position: absolute; border-radius: 50%; background: #a8e8df;
    animation: twinkle var(--dur,3s) ease-in-out infinite alternate;
    opacity: var(--op,0.3);
  }
  @keyframes twinkle {
    from { opacity: var(--op,0.2); transform: scale(1); }
    to   { opacity: calc(var(--op,0.3) + 0.5); transform: scale(1.8); }
  }

  /* ── PAGE ── */
  .page {
    position: relative; z-index: 1;
    max-width: 1020px; margin: 0 auto;
    padding: 0 20px 80px;
  }

  /* ── HEADER ── */
  .page header { text-align: center; padding: 44px 20px 28px; }
  .page header h1 { line-height: 1; }
  .eyebrow {
    font-family: var(--font-cinzel), serif;
    font-size: 10px; letter-spacing: 7px;
    color: var(--teal-bright); text-transform: uppercase;
    margin-bottom: 14px;
    animation: fadeUp 1s ease both;
  }
  .hline {
    width: 100px; height: 1px; margin: 0 auto 16px;
    background: linear-gradient(90deg, transparent, var(--teal-bright), transparent);
    animation: hlineGrow 2s ease-in-out infinite alternate;
  }
  @keyframes hlineGrow {
    from { width: 60px; opacity: 0.5; }
    to   { width: 160px; opacity: 1; }
  }
  .page h1 {
    font-family: var(--font-cinzel-decorative), serif;
    font-size: clamp(2rem, 6vw, 3.8rem); font-weight: 700;
    background: linear-gradient(135deg, #a8e8df 0%, var(--teal-bright) 45%, var(--gold) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 28px var(--teal-glow));
    animation: fadeUp 1s 0.2s ease both;
  }
  .tagline {
    font-style: italic; font-size: 1.05rem;
    color: var(--text-muted); margin-top: 10px;
    animation: fadeUp 1s 0.4s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .moon-badge {
    font-size: 0.82rem; color: var(--text-muted);
    text-align: center; margin-top: 6px;
    letter-spacing: 1px; font-style: italic;
    min-height: 1.2em;
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex; align-items: center; gap: 14px;
    margin: 8px 0; opacity: 0.4;
  }
  .divider-line { flex: 1; height: 1px; background: var(--teal-accent); }
  .divider-sym  { color: var(--teal-bright); font-size: 1rem; }

  /* ── CONTROLS ── */
  .controls {
    display: flex; flex-wrap: wrap;
    gap: 12px; justify-content: center;
    margin: 28px 0 16px;
    animation: fadeUp 1s 0.6s ease both;
  }
  .controls select {
    font-family: var(--font-cinzel), serif; font-size: 0.75rem;
    letter-spacing: 1px;
    background-color: rgba(13,61,58,0.85);
    color: var(--teal-bright);
    border: 1px solid var(--teal-accent);
    border-radius: 4px;
    padding: 12px 36px 12px 16px;
    cursor: pointer; outline: none;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232eb8a0' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: border-color 0.3s, box-shadow 0.3s;
    min-width: 250px;
  }
  .controls select:hover, .controls select:focus {
    border-color: var(--teal-bright);
    box-shadow: 0 0 18px var(--teal-glow);
  }
  .controls select option { background: var(--teal-dark); color: var(--text-light); }

  .btn {
    font-family: var(--font-cinzel), serif; font-size: 0.72rem;
    letter-spacing: 3px; text-transform: uppercase;
    border: 1px solid var(--teal-bright);
    background: transparent; color: var(--teal-bright);
    padding: 12px 26px; border-radius: 4px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: color 0.3s, box-shadow 0.3s;
  }
  .btn::before {
    content: ''; position: absolute; inset: 0;
    background: var(--teal-bright);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s ease; z-index: -1;
  }
  .btn:hover::before { transform: scaleX(1); }
  .btn:hover  { color: var(--teal-dark); box-shadow: 0 0 24px var(--teal-glow); }
  .btn:active { transform: scale(0.97); }
  .btn-reveal { border-color: var(--gold); color: var(--gold); }
  .btn-reveal::before { background: var(--gold); }
  .btn-reveal:hover { color: var(--teal-dark); box-shadow: 0 0 24px var(--gold-glow); }

  /* ── STATUS ── */
  #statusBar {
    text-align: center;
    font-family: var(--font-cinzel), serif; font-size: 0.68rem;
    letter-spacing: 3px; color: var(--teal-accent);
    text-transform: uppercase; min-height: 22px;
    margin: 8px 0 14px;
  }

  /* ── SHUFFLE AREA ── */
  #shuffleArea { position: relative; height: 150px; margin: 4px 0; }

  .stack-card {
    width: 62px; height: 98px;
    position: absolute; border-radius: 7px;
    background: ${CARD_BACK_BG};
    border: 1px solid rgba(46,184,160,0.5);
    box-shadow: 0 6px 24px rgba(0,0,0,0.7), 0 0 12px rgba(46,184,160,0.2);
    transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  .stack-card::after,
  .card-back::after {
    content: '✦';
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: rgba(168,232,223,0.55);
    font-size: 1.6rem;
    text-shadow: 0 0 10px rgba(46,184,160,0.6);
    pointer-events: none;
  }

  /* ── RIBBON ARC ── */
  #ribbon { position: relative; height: 270px; margin: 4px 0 16px; }
  .ribbon-card {
    width: 82px; height: 128px;
    position: absolute; border-radius: 7px;
    background: ${CARD_BACK_BG};
    border: 1px solid rgba(46,184,160,0.3);
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.34,1.4,0.64,1);
    box-shadow: 0 8px 24px rgba(0,0,0,0.6);
  }
  .ribbon-card::after {
    content: '✦';
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: rgba(168,232,223,0.55);
    font-size: 1.8rem;
    text-shadow: 0 0 10px rgba(46,184,160,0.6);
    pointer-events: none;
  }
  .ribbon-card:hover {
    transform: translateY(-30px) scale(1.08) !important;
    border-color: var(--teal-bright);
    box-shadow: 0 24px 48px rgba(0,0,0,0.7), 0 0 32px var(--teal-glow);
    z-index: 100;
  }
  .ribbon-card.picked {
    opacity: 0;
    transform: translateY(-50px) scale(0.75) !important;
    pointer-events: none;
    transition: all 0.4s ease;
  }

  /* ── MAT ── */
  #mat {
    position: relative;
    min-height: 500px; width: 100%; max-width: 720px;
    margin: 0 auto;
    background: ${MAT_BG};
    border-radius: 18px; padding: 44px 20px;
    box-shadow:
      0 0 0 1px rgba(46,184,160,0.15),
      0 24px 60px rgba(0,0,0,0.7),
      0 0 60px rgba(46,184,160,0.08);
  }

  /* ── MAT CARDS ── */
  .mat-card {
    width: 90px; height: 142px;
    perspective: 900px; position: absolute;
    transform: translate(-50%,-50%);
    animation: cardArrive 0.65s cubic-bezier(0.34,1.4,0.64,1) both;
  }
  @keyframes cardArrive {
    from { opacity: 0; transform: translate(-50%,-90%) scale(0.6); }
    to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  }
  .card-inner {
    width: 100%; height: 100%; position: relative;
    transform-style: preserve-3d;
    transition: transform 0.85s cubic-bezier(0.4,0,0.2,1);
  }
  .flip .card-inner { transform: rotateY(180deg); }
  .card-front, .card-back {
    position: absolute; width: 100%; height: 100%;
    border-radius: 7px; backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .card-back {
    background: ${CARD_BACK_BG};
    border: 1px solid rgba(46,184,160,0.5);
    box-shadow: 0 8px 30px rgba(0,0,0,0.7), 0 0 20px var(--teal-glow);
  }

  .card-front {
    transform: rotateY(180deg);
    overflow: hidden;
    border: 1px solid rgba(201,168,76,0.5);
    box-shadow: 0 8px 30px rgba(0,0,0,0.6), 0 0 18px var(--gold-glow);
    background: var(--teal-dark);
  }
  .card-front img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .card-placeholder {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(145deg, #0d3d3a, #0a2a2a);
    padding: 8px; text-align: center; gap: 6px;
  }
  .cp-sym { font-size: 1.5rem; color: var(--teal-bright); opacity: 0.75; }
  .cp-name {
    font-family: var(--font-cinzel), serif; font-size: 0.48rem;
    letter-spacing: 1px; color: var(--cream-dim); line-height: 1.5;
  }
  .card-label {
    position: absolute; bottom: -26px; left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-cinzel), serif; font-size: 0.5rem;
    letter-spacing: 2px; color: var(--teal-bright);
    text-transform: uppercase; white-space: nowrap;
    text-shadow: 0 0 10px var(--teal-glow);
  }

  /* ── RESULT ── */
  #result { max-width: 720px; margin: 52px auto 0; }
  .result-header {
    text-align: center;
    font-family: var(--font-cinzel-decorative), serif; font-size: 1.1rem;
    color: var(--teal-bright); letter-spacing: 3px;
    margin-bottom: 24px;
    filter: drop-shadow(0 0 12px var(--teal-glow));
    animation: fadeUp 0.6s ease both;
  }
  .reading-card {
    background: linear-gradient(135deg, rgba(13,61,58,0.95), rgba(10,42,42,0.98));
    border: 1px solid rgba(46,184,160,0.2);
    border-left: 3px solid var(--teal-bright);
    border-radius: 10px;
    padding: 20px 24px; margin-bottom: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
    animation: fadeUp 0.6s ease both;
  }
  .reading-card:hover {
    border-color: rgba(46,184,160,0.6);
    box-shadow: 0 0 24px var(--teal-glow);
  }
  .rc-position {
    font-family: var(--font-cinzel), serif; font-size: 0.62rem;
    letter-spacing: 3px; color: var(--teal-accent);
    text-transform: uppercase; margin-bottom: 4px;
  }
  .rc-name {
    font-family: var(--font-cinzel-decorative), serif; font-size: 0.95rem;
    color: var(--cream); margin-bottom: 8px; line-height: 1.3;
  }
  .rc-text {
    font-style: italic; font-size: 1.05rem;
    color: var(--text-muted); line-height: 1.65;
  }
  .rev-badge {
    display: inline-block;
    font-family: var(--font-cinzel), serif; font-size: 0.52rem;
    letter-spacing: 2px; color: var(--gold);
    border: 1px solid var(--gold); border-radius: 20px;
    padding: 2px 8px; margin-left: 8px; vertical-align: middle;
    text-transform: uppercase;
  }

  /* ── CURSOR SPARKS ── */
  .cursor-spark {
    position: fixed; pointer-events: none; z-index: 9999;
    width: 5px; height: 5px; border-radius: 50%;
    animation: sparkFade 0.9s ease forwards;
  }
  @keyframes sparkFade {
    0%   { opacity: 1; transform: scale(1) translate(0,0); }
    100% { opacity: 0; transform: scale(0) translate(var(--dx),var(--dy)); }
  }

  .scroll-hint {
    text-align: center;
    font-family: var(--font-cinzel), serif; font-size: 0.58rem;
    letter-spacing: 5px; color: rgba(46,184,160,0.2);
    text-transform: uppercase; margin-top: 60px;
    animation: pulse 3s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }

  @media (max-width: 600px) {
    #mat { min-height: 380px; }
    .mat-card { width: 72px; height: 114px; }
  }
`
