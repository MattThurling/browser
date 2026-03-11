import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, Ellipsis, Lock, Pause, Play } from "lucide-react";
import NavigationOverlay from "../components/NavigationOverlay";
import { tracks } from "../data/tracks";

const TICK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const WAVE_DELAYS = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];
const NOTE_SCALE = [220, 261.63, 293.66, 329.63, 392, 440, 493.88, 523.25];
const PLAY_INTERVAL_MS = 280;

const PLAYER_TRACK = tracks.find((track) => track.title === "Afterglow Lines") ?? tracks[0];
const JP_AVATAR =
  tracks.find((track) => track.creator === "JP")?.creatorAvatar ??
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=260&q=80";

function buildPattern(trackId) {
  const seed = trackId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

  return Array.from({ length: 12 }, (_, index) => {
    const step = (seed + index * 3 + (index % 2 === 0 ? 1 : 0)) % NOTE_SCALE.length;
    return NOTE_SCALE[step];
  });
}

function VersionsPlayerScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const playbackIntervalRef = useRef(null);
  const stepRef = useRef(0);
  const pattern = useMemo(() => buildPattern(PLAYER_TRACK.id), []);

  const stopPlayback = useCallback(() => {
    if (playbackIntervalRef.current) {
      window.clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }

    setIsPlaying(false);
    stepRef.current = 0;
  }, []);

  const playStep = useCallback((context, frequency) => {
    const now = context.currentTime;

    const lead = context.createOscillator();
    const leadGain = context.createGain();
    lead.type = "triangle";
    lead.frequency.setValueAtTime(frequency, now);
    leadGain.gain.setValueAtTime(0.0001, now);
    leadGain.gain.exponentialRampToValueAtTime(0.11, now + 0.03);
    leadGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    lead.connect(leadGain);
    leadGain.connect(context.destination);
    lead.start(now);
    lead.stop(now + 0.26);

    const bass = context.createOscillator();
    const bassGain = context.createGain();
    bass.type = "sine";
    bass.frequency.setValueAtTime(frequency / 2, now);
    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    bass.connect(bassGain);
    bassGain.connect(context.destination);
    bass.start(now);
    bass.stop(now + 0.32);
  }, []);

  const handlePlayToggle = useCallback(async () => {
    if (isPlaying) {
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

    stepRef.current = 0;
    setIsPlaying(true);
    playStep(context, pattern[0]);
    stepRef.current = 1;

    playbackIntervalRef.current = window.setInterval(() => {
      const nextFrequency = pattern[stepRef.current % pattern.length];
      playStep(context, nextFrequency);
      stepRef.current += 1;
    }, PLAY_INTERVAL_MS);
  }, [isPlaying, pattern, playStep, stopPlayback]);

  useEffect(() => {
    return () => {
      if (playbackIntervalRef.current) {
        window.clearInterval(playbackIntervalRef.current);
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <main className="mx-auto flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-white text-[#1d1f24]">
      <header className="px-5 pb-2 pt-4">
        <div className="flex items-center justify-between text-sm">
          <a href="/" className="flex items-center gap-1 text-[#2f3339]">
            <ChevronLeft className="h-4 w-4" />
            Back
          </a>

          <button
            type="button"
            aria-label="Open navigation"
            className="text-[#2f3339]"
            onClick={() => setIsMenuOpen(true)}
          >
            <Ellipsis className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="flex-1 overflow-hidden px-5 pb-2">
        <div className="relative mx-auto mt-2 w-full max-w-[286px]">
          <img
            src={PLAYER_TRACK.thumbnail}
            alt={`${PLAYER_TRACK.title} cover art`}
            className="h-[286px] w-full rounded-2xl object-cover shadow-lg"
          />

          {isPlaying ? (
            <div className="wave-overlay rounded-2xl" aria-hidden="true" style={{ "--wave-speed": "0.85s" }}>
              {WAVE_DELAYS.map((delay, index) => (
                <span
                  key={`player-wave-${index}`}
                  className="wave-bar"
                  style={{
                    "--wave-delay": delay,
                    "--wave-height": `${14 + (index % 4) * 3}px`
                  }}
                />
              ))}
            </div>
          ) : null}

          <img
            src={JP_AVATAR}
            alt="JP avatar"
            className="absolute -bottom-8 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>

        <div className="mt-9 grid grid-cols-[18px_1fr_30px] items-center gap-4">
          <div className="relative mx-auto h-[188px] w-[8px] rounded-full bg-[#d2d2d2] shadow-inner">
            <span className="absolute left-0 top-3 h-14 w-full rounded-full bg-[#6b6b6b]" />
          </div>

          <div className="flex flex-col items-center">
            <p className="mb-2 w-full text-left text-[15px] font-semibold uppercase tracking-wide text-[#b5b5b5]">
              Stem 6
            </p>

            <div className="relative flex h-[198px] w-[198px] items-center justify-center rounded-full border border-[#cfcfcf] bg-[#ececec] shadow-lg">
              {TICK_ANGLES.map((angle) => (
                <span
                  key={angle}
                  className="absolute h-2 w-[1.5px] rounded-full bg-[#707070]"
                  style={{ transform: `rotate(${angle}deg) translateY(-90px)` }}
                />
              ))}

              <button
                type="button"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={handlePlayToggle}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-transparent"
              >
                {isPlaying ? <Pause className="h-10 w-10 fill-[#151922] text-[#151922]" /> : <Play className="h-10 w-10 fill-[#151922] text-[#151922]" />}
              </button>
            </div>
          </div>

          <div className="flex h-[188px] flex-col items-center justify-between">
            <Lock className="h-3.5 w-3.5 text-[#9a9a9a]" />

            <div className="relative h-[152px] w-[6px] rounded-full bg-[#c8c8c8]">
              <span className="absolute left-1/2 top-[54px] h-7 w-7 -translate-x-1/2 rounded-full bg-[#11151e]" />
            </div>

            <button
              type="button"
              className="rounded-2xl border border-[#9f9f9f] px-2 py-1 text-center text-[12px] font-semibold leading-tight text-[#5b5b5b]"
            >
              +4
              <br />
              <span className="text-[11px] font-medium">Pitch</span>
            </button>
          </div>
        </div>

        <div className="mt-3 px-1">
          <h1 className="text-[36px] font-semibold leading-none">
            Afterglow Lines<span className="align-top text-xl text-black">*</span>
          </h1>
          <p className="mt-1 text-[18px] font-normal leading-none text-[#535353]">Cass Atlas</p>
          <p className="mt-2 text-[14px] text-[#6d6d6d]">
            887 <span className="mx-1">┆</span> Versions <span className="mx-1">05.2024</span>
          </p>
        </div>
      </section>

      <nav className="grid w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center border-t border-[#b7b7b7] bg-white px-2 py-2.5 text-[#7a7a7a]">
        <button type="button" className="flex h-10 w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M4 5h16v11H7l-3 3z" />
            <path d="M8 9h8M8 12h5" />
          </svg>
        </button>

        <span className="h-5 w-px bg-[#bfbfbf]" />

        <button type="button" className="flex h-10 w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="5" height="5" />
            <rect x="15" y="4" width="5" height="5" />
            <rect x="4" y="15" width="5" height="5" />
            <rect x="15" y="15" width="5" height="5" />
          </svg>
        </button>

        <span className="h-5 w-px bg-[#bfbfbf]" />

        <div className="flex w-full justify-center">
          <img src={JP_AVATAR} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
        </div>
      </nav>

      <NavigationOverlay open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}

export default VersionsPlayerScreen;
