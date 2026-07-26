// Lightweight synthesized UI sound effects using the Web Audio API.
// No assets required — modern, minimal, premium-feeling blips.

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      (window.AudioContext as typeof AudioContext | undefined) ??
      ((window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext);
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type ToneOpts = {
  freq: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
  attack?: number;
  release?: number;
  glideTo?: number;
  delay?: number;
};

function tone(o: ToneOpts) {
  const ac = getCtx();
  if (!ac || muted) return;
  const t0 = ac.currentTime + (o.delay ?? 0);
  const dur = o.duration ?? 0.12;
  const attack = o.attack ?? 0.005;
  const release = o.release ?? Math.max(0.03, dur - attack);
  const peak = o.gain ?? 0.08;

  const osc = ac.createOscillator();
  const g = ac.createGain();
  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 200;

  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.freq, t0);
  if (o.glideTo) {
    osc.frequency.exponentialRampToValueAtTime(o.glideTo, t0 + dur);
  }

  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + release);

  osc.connect(hp);
  hp.connect(g);
  g.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + attack + release + 0.02);
}

export const sfx = {
  setMuted(v: boolean) {
    muted = v;
  },
  // Prime AudioContext on first user gesture (needed on iOS/Android).
  prime() {
    getCtx();
  },
  click() {
    tone({ freq: 880, glideTo: 1400, duration: 0.06, type: "triangle", gain: 0.05, release: 0.05 });
  },
  tap() {
    tone({ freq: 1600, duration: 0.03, type: "sine", gain: 0.03, release: 0.03 });
  },
  success() {
    tone({ freq: 660, duration: 0.09, type: "sine", gain: 0.07 });
    tone({ freq: 990, duration: 0.12, type: "sine", gain: 0.07, delay: 0.08 });
    tone({ freq: 1320, duration: 0.16, type: "triangle", gain: 0.06, delay: 0.16 });
  },
  saved() {
    tone({ freq: 740, duration: 0.08, type: "sine", gain: 0.06 });
    tone({ freq: 1180, duration: 0.14, type: "triangle", gain: 0.06, delay: 0.07 });
  },
  back() {
    tone({ freq: 1200, glideTo: 700, duration: 0.09, type: "triangle", gain: 0.05 });
  },
};
