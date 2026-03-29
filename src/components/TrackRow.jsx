import { useRef } from "react";

function buildWaveDelays(count) {
  return Array.from({ length: count }, (_, index) => `${(index * 0.08).toFixed(2)}s`);
}

const WAVE_SAMPLE_COUNT = 6;
const SWIPE_TRIGGER_PX = 54;

function TrackRow({ track, isPlaying, onSelect, onVersionSwipe, onOpenMenu, profile }) {
  const pointerIdRef = useRef(null);
  const startPointRef = useRef({ x: 0, y: 0 });
  const deltaXRef = useRef(0);
  const isHorizontalSwipeRef = useRef(false);
  const suppressClickRef = useRef(false);

  const waveDelays = buildWaveDelays(WAVE_SAMPLE_COUNT);
  const showCreatorInSubtitle =
    track.artist.trim().toLowerCase() !== track.creator.trim().toLowerCase();

  const resetSwipeState = () => {
    pointerIdRef.current = null;
    deltaXRef.current = 0;
    isHorizontalSwipeRef.current = false;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(track);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onVersionSwipe(track.id, "next");
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      onVersionSwipe(track.id, "previous");
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerIdRef.current = event.pointerId;
    startPointRef.current = { x: event.clientX, y: event.clientY };
    deltaXRef.current = 0;
    isHorizontalSwipeRef.current = false;
  };

  const handlePointerMove = (event) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - startPointRef.current.x;
    const deltaY = event.clientY - startPointRef.current.y;
    deltaXRef.current = deltaX;

    if (!isHorizontalSwipeRef.current) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) {
        return;
      }

      if (Math.abs(deltaX) <= Math.abs(deltaY)) {
        resetSwipeState();
        return;
      }

      isHorizontalSwipeRef.current = true;
      suppressClickRef.current = true;
    }
  };

  const handlePointerEnd = () => {
    if (!isHorizontalSwipeRef.current) {
      resetSwipeState();
      return;
    }

    if (Math.abs(deltaXRef.current) < SWIPE_TRIGGER_PX) {
      resetSwipeState();
      return;
    }

    const direction = deltaXRef.current < 0 ? "next" : "previous";
    onVersionSwipe(track.id, direction);
    resetSwipeState();
  };

  const handleRowClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    onSelect(track);
  };

  return (
    <li
      role="button"
      tabIndex={0}
      aria-pressed={isPlaying}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={resetSwipeState}
      className={`group grid cursor-pointer grid-cols-[42px_52px_1fr_44px] items-center gap-3 rounded-2xl px-2 py-2 transition-colors ${
        isPlaying ? "bg-base-200/90" : "hover:bg-base-200/80"
      }`}
      style={{ touchAction: "pan-y" }}
    >
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <img
          src={track.creatorAvatar}
          alt={`${track.creator} avatar`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative h-[52px] w-[52px] overflow-hidden rounded-xl">
        <img
          src={track.thumbnail}
          alt={`${track.title} cover art`}
          className="h-[52px] w-[52px] object-cover shadow-sm"
          loading="lazy"
        />
        {isPlaying ? (
          <div
            className="wave-overlay"
            aria-hidden="true"
            style={{
              "--wave-speed": profile?.waveSpeed ?? "1s"
            }}
          >
            {waveDelays.map((delay, index) => (
              <span
                key={`${track.id}-wave-${index}`}
                className="wave-bar"
                style={{
                  "--wave-delay": delay,
                  "--wave-height": `${14 + (index % 4) * 3}px`
                }}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-1">
          <p className="truncate text-sm font-semibold text-base-content">{track.title}</p>
          <span aria-hidden="true" className="text-base leading-none text-black">
            *
          </span>
          {track.mixTitle ? (
            <span className="truncate text-sm font-semibold text-base-content/80">
              {track.mixTitle}
            </span>
          ) : null}
        </div>
        <div className="mt-0.5">
          <p className="truncate text-xs text-base-content/70">
            {showCreatorInSubtitle ? `${track.artist} \u2022 ${track.creator}` : track.artist}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-square h-11 min-h-0 w-11 justify-self-end rounded-xl text-lg leading-none text-base-content/60"
        aria-label={`Open menu for ${track.title}`}
        onClick={(event) => {
          event.stopPropagation();
          onOpenMenu(track);
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        ⋮
      </button>
    </li>
  );
}

export default TrackRow;
