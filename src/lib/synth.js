const NOTE_SCALES = {
  bright: [261.63, 329.63, 392, 523.25, 659.25, 783.99],
  moody: [220, 261.63, 293.66, 329.63, 392, 440],
  airy: [293.66, 369.99, 440, 554.37, 659.25, 880],
  deep: [174.61, 220, 261.63, 293.66, 349.23, 392],
  glitch: [246.94, 277.18, 311.13, 369.99, 415.3, 466.16]
};

const PLAYER_NOTE_SCALE = [220, 261.63, 293.66, 329.63, 392, 440, 493.88, 523.25];

export const PLAYBACK_PROFILES = [
  {
    id: "pulse",
    scale: "bright",
    tempoMs: 200,
    leadType: "sawtooth",
    bassType: "square",
    detune: 12,
    bassRatio: 0.5,
    leadGain: 0.09,
    bassGain: 0.07,
    leadAttack: 0.015,
    leadDecay: 0.2,
    bassDecay: 0.24,
    filterType: "highpass",
    filterFrequency: 760,
    filterQ: 0.8,
    drive: 35,
    delayTime: 0.12,
    delayFeedback: 0.24,
    delayMix: 0.28,
    masterGain: 0.55,
    tremoloRate: 0,
    tremoloDepth: 0,
    waveColor: "rgba(254, 240, 138, 0.95)",
    waveBg: "rgba(31, 19, 0, 0.55)",
    waveSpeed: "0.6s",
    waveBars: 8,
    activeGlow: "rgba(250, 204, 21, 0.45)"
  },
  {
    id: "deep",
    scale: "deep",
    tempoMs: 340,
    leadType: "triangle",
    bassType: "sine",
    detune: -6,
    bassRatio: 0.33,
    leadGain: 0.08,
    bassGain: 0.12,
    leadAttack: 0.03,
    leadDecay: 0.3,
    bassDecay: 0.36,
    filterType: "lowpass",
    filterFrequency: 380,
    filterQ: 1.1,
    drive: 12,
    delayTime: 0.22,
    delayFeedback: 0.34,
    delayMix: 0.44,
    masterGain: 0.58,
    tremoloRate: 2.2,
    tremoloDepth: 0.05,
    waveColor: "rgba(147, 197, 253, 0.95)",
    waveBg: "rgba(5, 18, 38, 0.58)",
    waveSpeed: "1.2s",
    waveBars: 5,
    activeGlow: "rgba(59, 130, 246, 0.45)"
  },
  {
    id: "glitch",
    scale: "glitch",
    tempoMs: 150,
    leadType: "square",
    bassType: "sawtooth",
    detune: 22,
    bassRatio: 0.5,
    leadGain: 0.07,
    bassGain: 0.06,
    leadAttack: 0.008,
    leadDecay: 0.13,
    bassDecay: 0.16,
    filterType: "bandpass",
    filterFrequency: 1280,
    filterQ: 8,
    drive: 78,
    delayTime: 0.08,
    delayFeedback: 0.5,
    delayMix: 0.31,
    masterGain: 0.5,
    tremoloRate: 0,
    tremoloDepth: 0,
    waveColor: "rgba(249, 168, 212, 0.95)",
    waveBg: "rgba(43, 3, 31, 0.58)",
    waveSpeed: "0.45s",
    waveBars: 9,
    activeGlow: "rgba(236, 72, 153, 0.45)"
  },
  {
    id: "air",
    scale: "airy",
    tempoMs: 470,
    leadType: "sine",
    bassType: "triangle",
    detune: 0,
    bassRatio: 0.5,
    leadGain: 0.12,
    bassGain: 0.06,
    leadAttack: 0.05,
    leadDecay: 0.44,
    bassDecay: 0.5,
    filterType: "lowpass",
    filterFrequency: 920,
    filterQ: 0.7,
    drive: 4,
    delayTime: 0.32,
    delayFeedback: 0.56,
    delayMix: 0.62,
    masterGain: 0.56,
    tremoloRate: 1.1,
    tremoloDepth: 0.04,
    waveColor: "rgba(134, 239, 172, 0.95)",
    waveBg: "rgba(3, 29, 20, 0.54)",
    waveSpeed: "1.6s",
    waveBars: 4,
    activeGlow: "rgba(34, 197, 94, 0.42)"
  },
  {
    id: "snap",
    scale: "moody",
    tempoMs: 250,
    leadType: "triangle",
    bassType: "square",
    detune: 6,
    bassRatio: 0.25,
    leadGain: 0.08,
    bassGain: 0.08,
    leadAttack: 0.02,
    leadDecay: 0.22,
    bassDecay: 0.27,
    filterType: "highpass",
    filterFrequency: 520,
    filterQ: 1.3,
    drive: 20,
    delayTime: 0.14,
    delayFeedback: 0.22,
    delayMix: 0.2,
    masterGain: 0.57,
    tremoloRate: 3.4,
    tremoloDepth: 0.03,
    waveColor: "rgba(196, 181, 253, 0.95)",
    waveBg: "rgba(21, 12, 46, 0.52)",
    waveSpeed: "0.8s",
    waveBars: 6,
    activeGlow: "rgba(139, 92, 246, 0.45)"
  }
];

export const PLAYER_SYNTH_PROFILE = {
  leadType: "triangle",
  bassType: "sine",
  detune: 0,
  bassRatio: 0.5,
  leadGain: 0.11,
  bassGain: 0.08,
  leadAttack: 0.03,
  leadDecay: 0.24,
  bassAttack: 0.04,
  bassDecay: 0.3
};

export const VERSION_PITCH_OFFSETS = [1, 1.05946, 0.94387, 1.0293];

export function createAudioContext() {
  const Context = window.AudioContext || window.webkitAudioContext;
  return new Context();
}

export function buildPattern(trackId, scaleName, versionIndex = 0) {
  const baseSeed = trackId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  const seed = baseSeed + versionIndex * 17;
  const scale = NOTE_SCALES[scaleName] ?? NOTE_SCALES.bright;

  return Array.from({ length: 12 }, (_, index) => {
    const jump = index % 3 === 0 ? 4 : 2;
    const step = (seed + index * jump + (index % 2 === 0 ? 1 : 0)) % scale.length;
    return scale[step];
  });
}

export function buildPlayerPattern(trackId) {
  const seed = trackId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

  return Array.from({ length: 12 }, (_, index) => {
    const step = (seed + index * 3 + (index % 2 === 0 ? 1 : 0)) % PLAYER_NOTE_SCALE.length;
    return PLAYER_NOTE_SCALE[step];
  });
}

export function buildEffectChain(context, profile) {
  const inputGain = context.createGain();
  const filterNode = context.createBiquadFilter();
  const driveNode = context.createWaveShaper();
  const delayNode = context.createDelay(1);
  const feedbackGain = context.createGain();
  const dryGain = context.createGain();
  const wetGain = context.createGain();
  const outputGain = context.createGain();

  filterNode.type = profile.filterType;
  filterNode.frequency.setValueAtTime(profile.filterFrequency, context.currentTime);
  filterNode.Q.setValueAtTime(profile.filterQ, context.currentTime);
  driveNode.curve = makeDistortionCurve(profile.drive);
  driveNode.oversample = "4x";

  delayNode.delayTime.setValueAtTime(profile.delayTime, context.currentTime);
  feedbackGain.gain.setValueAtTime(profile.delayFeedback, context.currentTime);
  wetGain.gain.setValueAtTime(profile.delayMix, context.currentTime);
  dryGain.gain.setValueAtTime(1 - profile.delayMix, context.currentTime);
  outputGain.gain.setValueAtTime(profile.masterGain, context.currentTime);

  inputGain.connect(filterNode);
  filterNode.connect(driveNode);
  driveNode.connect(dryGain);
  driveNode.connect(delayNode);
  delayNode.connect(feedbackGain);
  feedbackGain.connect(delayNode);
  delayNode.connect(wetGain);
  dryGain.connect(outputGain);
  wetGain.connect(outputGain);
  outputGain.connect(context.destination);

  let lfoOscillator = null;
  let lfoGain = null;
  if (profile.tremoloDepth > 0) {
    lfoOscillator = context.createOscillator();
    lfoGain = context.createGain();

    lfoOscillator.frequency.setValueAtTime(profile.tremoloRate, context.currentTime);
    lfoGain.gain.setValueAtTime(profile.tremoloDepth, context.currentTime);
    outputGain.gain.setValueAtTime(
      Math.max(0.05, profile.masterGain - profile.tremoloDepth),
      context.currentTime
    );

    lfoOscillator.connect(lfoGain);
    lfoGain.connect(outputGain.gain);
    lfoOscillator.start();
  }

  return {
    inputGain,
    filterNode,
    driveNode,
    delayNode,
    feedbackGain,
    dryGain,
    wetGain,
    outputGain,
    lfoOscillator,
    lfoGain
  };
}

export function tearDownEffectChain(activeNodes) {
  if (!activeNodes) {
    return;
  }

  if (activeNodes.lfoOscillator) {
    try {
      activeNodes.lfoOscillator.stop();
    } catch {
      // no-op: node can already be stopped
    }
  }

  const nodesToDisconnect = [
    activeNodes.inputGain,
    activeNodes.filterNode,
    activeNodes.driveNode,
    activeNodes.dryGain,
    activeNodes.wetGain,
    activeNodes.delayNode,
    activeNodes.feedbackGain,
    activeNodes.outputGain,
    activeNodes.lfoOscillator,
    activeNodes.lfoGain
  ];

  nodesToDisconnect.forEach((node) => {
    if (!node) {
      return;
    }
    try {
      node.disconnect();
    } catch {
      // no-op: node can already be disconnected
    }
  });
}

export function playSynthStep(
  context,
  frequency,
  profile,
  destinationNode = context.destination
) {
  if (!destinationNode) {
    return;
  }

  const now = context.currentTime;

  const lead = context.createOscillator();
  const leadGain = context.createGain();
  lead.type = profile.leadType;
  lead.frequency.setValueAtTime(frequency, now);
  if (typeof profile.detune === "number") {
    lead.detune.setValueAtTime(profile.detune, now);
  }
  leadGain.gain.setValueAtTime(0.0001, now);
  leadGain.gain.exponentialRampToValueAtTime(profile.leadGain, now + profile.leadAttack);
  leadGain.gain.exponentialRampToValueAtTime(0.0001, now + profile.leadDecay);
  lead.connect(leadGain);
  leadGain.connect(destinationNode);
  lead.start(now);
  lead.stop(now + profile.leadDecay + 0.05);

  const bass = context.createOscillator();
  const bassGain = context.createGain();
  bass.type = profile.bassType;
  bass.frequency.setValueAtTime(frequency * profile.bassRatio, now);
  bassGain.gain.setValueAtTime(0.0001, now);
  bassGain.gain.exponentialRampToValueAtTime(
    profile.bassGain,
    now + (profile.bassAttack ?? 0.04)
  );
  bassGain.gain.exponentialRampToValueAtTime(0.0001, now + profile.bassDecay);
  bass.connect(bassGain);
  bassGain.connect(destinationNode);
  bass.start(now);
  bass.stop(now + profile.bassDecay + 0.05);
}

function makeDistortionCurve(amount) {
  const sampleCount = 256;
  const curve = new Float32Array(sampleCount);
  const k = Math.max(1, amount);
  const radians = Math.PI / 180;

  for (let index = 0; index < sampleCount; index += 1) {
    const x = (index * 2) / sampleCount - 1;
    curve[index] = ((3 + k) * x * 20 * radians) / (Math.PI + k * Math.abs(x));
  }

  return curve;
}
