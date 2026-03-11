import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import FilterBar from "./components/FilterBar";
import NavigationOverlay from "./components/NavigationOverlay";
import TrackRow from "./components/TrackRow";
import { tracks } from "./data/tracks";

const NOTE_SCALES = {
  bright: [261.63, 329.63, 392, 523.25, 659.25, 783.99],
  moody: [220, 261.63, 293.66, 329.63, 392, 440],
  airy: [293.66, 369.99, 440, 554.37, 659.25, 880],
  deep: [174.61, 220, 261.63, 293.66, 349.23, 392],
  glitch: [246.94, 277.18, 311.13, 369.99, 415.3, 466.16]
};

const PLAYBACK_PROFILES = [
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

const VERSION_PITCH_OFFSETS = [1, 1.05946, 0.94387, 1.0293];

function buildPattern(trackId, scaleName, versionIndex = 0) {
  const baseSeed = trackId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  const seed = baseSeed + versionIndex * 17;
  const scale = NOTE_SCALES[scaleName] ?? NOTE_SCALES.bright;

  return Array.from({ length: 12 }, (_, index) => {
    const jump = index % 3 === 0 ? 4 : 2;
    const step = (seed + index * jump + (index % 2 === 0 ? 1 : 0)) % scale.length;
    return scale[step];
  });
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

function App() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [playingVersionIndex, setPlayingVersionIndex] = useState(0);
  const audioContextRef = useRef(null);
  const playbackIntervalRef = useRef(null);
  const activeNodesRef = useRef(null);
  const stepRef = useRef(0);
  const trackCatalog = tracks;
  const [versionIndexes, setVersionIndexes] = useState(() =>
    Object.fromEntries(tracks.map((track) => [track.id, 0]))
  );
  const trackProfiles = useMemo(
    () =>
      Object.fromEntries(
        tracks.map((track, index) => [track.id, PLAYBACK_PROFILES[index % PLAYBACK_PROFILES.length]])
      ),
    []
  );
  const versionCountByTrack = useMemo(
    () => Object.fromEntries(trackCatalog.map((track) => [track.id, track.versions.length])),
    [trackCatalog]
  );

  const filteredTracks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return trackCatalog.filter((track) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        track.title.toLowerCase().includes(normalizedQuery) ||
        track.artist.toLowerCase().includes(normalizedQuery);

      return matchesQuery;
    });
  }, [query, trackCatalog]);
  const dividerIndex = useMemo(() => {
    const firstNonJpIndex = filteredTracks.findIndex((track) => track.creator !== "JP");
    if (firstNonJpIndex <= 0) {
      return -1;
    }

    const hasJpBefore = filteredTracks
      .slice(0, firstNonJpIndex)
      .some((track) => track.creator === "JP");
    return hasJpBefore ? firstNonJpIndex : -1;
  }, [filteredTracks]);

  const handleVersionSwipe = useCallback(
    (trackId, direction) => {
      setVersionIndexes((previousState) => {
        const versionCount = versionCountByTrack[trackId] ?? 1;
        const currentIndex = previousState[trackId] ?? 0;
        const delta = direction === "next" ? 1 : -1;
        const nextIndex = (currentIndex + delta + versionCount) % versionCount;

        return {
          ...previousState,
          [trackId]: nextIndex
        };
      });
    },
    [versionCountByTrack]
  );

  const tearDownEffectChain = useCallback(() => {
    const activeNodes = activeNodesRef.current;
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

    activeNodesRef.current = null;
  }, []);

  const buildEffectChain = useCallback(
    (context, profile) => {
      tearDownEffectChain();

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

      activeNodesRef.current = {
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
    },
    [tearDownEffectChain]
  );

  const stopPlayback = useCallback(() => {
    if (playbackIntervalRef.current) {
      window.clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }

    tearDownEffectChain();
    setPlayingTrackId(null);
    setPlayingVersionIndex(0);
    stepRef.current = 0;
  }, [tearDownEffectChain]);

  const playStep = useCallback((context, frequency, profile) => {
    const inputGain = activeNodesRef.current?.inputGain;
    if (!inputGain) {
      return;
    }

    const now = context.currentTime;

    const lead = context.createOscillator();
    const leadGain = context.createGain();
    lead.type = profile.leadType;
    lead.frequency.setValueAtTime(frequency, now);
    lead.detune.setValueAtTime(profile.detune, now);
    leadGain.gain.setValueAtTime(0.0001, now);
    leadGain.gain.exponentialRampToValueAtTime(profile.leadGain, now + profile.leadAttack);
    leadGain.gain.exponentialRampToValueAtTime(0.0001, now + profile.leadDecay);
    lead.connect(leadGain);
    leadGain.connect(inputGain);
    lead.start(now);
    lead.stop(now + profile.leadDecay + 0.05);

    const bass = context.createOscillator();
    const bassGain = context.createGain();
    bass.type = profile.bassType;
    bass.frequency.setValueAtTime(frequency * profile.bassRatio, now);
    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.exponentialRampToValueAtTime(profile.bassGain, now + 0.04);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + profile.bassDecay);
    bass.connect(bassGain);
    bassGain.connect(inputGain);
    bass.start(now);
    bass.stop(now + profile.bassDecay + 0.05);
  }, []);

  const handleTrackSelect = useCallback(
    async (track) => {
      const selectedVersionIndex = track.versionIndex ?? 0;

      if (playingTrackId === track.id && playingVersionIndex === selectedVersionIndex) {
        stopPlayback();
        return;
      }

      if (!audioContextRef.current) {
        const Context = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new Context();
      }

      const context = audioContextRef.current;
      await context.resume();

      if (playbackIntervalRef.current) {
        window.clearInterval(playbackIntervalRef.current);
      }

      const profile = trackProfiles[track.id] ?? PLAYBACK_PROFILES[0];
      buildEffectChain(context, profile);
      const pattern = buildPattern(track.id, profile.scale, selectedVersionIndex);
      const versionPitchOffset =
        VERSION_PITCH_OFFSETS[selectedVersionIndex % VERSION_PITCH_OFFSETS.length] ?? 1;

      stepRef.current = 0;
      setPlayingTrackId(track.id);
      setPlayingVersionIndex(selectedVersionIndex);
      playStep(context, pattern[0] * versionPitchOffset, profile);
      stepRef.current = 1;

      playbackIntervalRef.current = window.setInterval(() => {
        const nextFrequency = pattern[stepRef.current % pattern.length];
        playStep(context, nextFrequency * versionPitchOffset, profile);
        stepRef.current += 1;
      }, profile.tempoMs);
    },
    [
      buildEffectChain,
      playStep,
      playingTrackId,
      playingVersionIndex,
      stopPlayback,
      trackProfiles
    ]
  );

  useEffect(() => {
    return () => {
      if (playbackIntervalRef.current) {
        window.clearInterval(playbackIntervalRef.current);
      }
      tearDownEffectChain();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [tearDownEffectChain]);

  useEffect(() => {
    if (!playingTrackId) {
      return;
    }

    const isTrackVisible = filteredTracks.some((track) => track.id === playingTrackId);
    if (!isTrackVisible) {
      stopPlayback();
    }
  }, [filteredTracks, playingTrackId, stopPlayback]);

  useEffect(() => {
    if (!playingTrackId) {
      return;
    }

    const activeVersionForPlayingTrack = versionIndexes[playingTrackId] ?? 0;
    if (activeVersionForPlayingTrack !== playingVersionIndex) {
      stopPlayback();
    }
  }, [playingTrackId, playingVersionIndex, stopPlayback, versionIndexes]);

  return (
    <main className="mx-auto flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-base-100 text-[#1d1f24]">
      <section className="relative flex h-full flex-col">
        <FilterBar query={query} onQueryChange={setQuery} onMenuClick={() => setIsMenuOpen(true)} />

        <div className="track-scrollbar flex-1 overflow-y-auto px-2 py-2">
          {filteredTracks.length > 0 ? (
            <ul className="space-y-1">
              {filteredTracks.map((track, index) => (
                <Fragment key={track.id}>
                  {index === dividerIndex ? (
                    <li aria-hidden="true" className="px-2 py-1.5">
                      <div className="h-px w-full bg-base-300" />
                    </li>
                  ) : null}
                  {(() => {
                    const versionCount = track.versions.length;
                    const currentVersionIndex = versionIndexes[track.id] ?? 0;
                    const safeVersionIndex =
                      ((currentVersionIndex % versionCount) + versionCount) % versionCount;
                    const activeVersion = track.versions[safeVersionIndex];
                    const displayTrack = {
                      ...track,
                      title: activeVersion.title,
                      artist: activeVersion.artist,
                      creator: activeVersion.creator,
                      creatorAvatar: activeVersion.creatorAvatar,
                      asteriskColor: activeVersion.asteriskColor,
                      versionIndex: safeVersionIndex
                    };

                    return (
                      <TrackRow
                        track={displayTrack}
                        isPlaying={playingTrackId === track.id}
                        profile={trackProfiles[track.id]}
                        onSelect={handleTrackSelect}
                        onVersionSwipe={handleVersionSwipe}
                      />
                    );
                  })()}
                </Fragment>
              ))}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center">
              <div>
                <p className="text-base font-semibold text-base-content/80">No tracks found</p>
                <p className="mt-1 text-sm text-base-content/60">
                  Try a different track or artist search term.
                </p>
              </div>
            </div>
          )}
        </div>

        <NavigationOverlay open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </section>
    </main>
  );
}

export default App;
