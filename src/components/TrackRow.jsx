import { EllipsisVertical, Play } from "lucide-react";
import { useRef } from "react";

function buildWaveDelays(count) {
  return Array.from({ length: count }, (_, index) => `${(index * 0.08).toFixed(2)}s`);
}

const WAVE_SAMPLE_COUNT = 6;
const SWIPE_TRIGGER_PX = 54;

function TrackRow({ track, isSelected, isPlaying, onSelect, onVersionSwipe, onOpenMenu, profile }) {
  const pointerIdRef = useRef(null);
  const startPointRef = useRef({ x: 0, y: 0 });
  const deltaXRef = useRef(0);
  const isHorizontalSwipeRef = useRef(false);
  const suppressClickRef = useRef(false);

  const waveDelays = buildWaveDelays(WAVE_SAMPLE_COUNT);
  const showCreatorInSubtitle =
    track.artist.trim().toLowerCase() !== track.creator.trim().toLowerCase();
  const showPlayOverlay = isSelected && !isPlaying;
  const hasAlternateVersions = (track.versions?.length ?? 0) > 1;
  const showVersionArrows = hasAlternateVersions && (isSelected || isPlaying);

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

  const triangleClassName = "h-3 w-3 fill-current";

  return (
    <li className="grid grid-cols-[1fr_40px] items-center gap-2 py-1">
      <div className="relative min-w-0">
        {showVersionArrows ? (
          <button
            type="button"
            aria-label={`Previous version for ${track.title}`}
            className="absolute -left-2 top-1/2 z-10 flex h-6 w-4 -translate-y-1/2 items-center justify-center text-base-content/35"
            onClick={(event) => {
              event.stopPropagation();
              onVersionSwipe(track.id, "previous");
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className={triangleClassName}>
              <path d="M16 6 8 12l8 6V6Z" />
            </svg>
          </button>
        ) : null}

        <div
          role="button"
          tabIndex={0}
          aria-pressed={isSelected || isPlaying}
          onClick={handleRowClick}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={resetSwipeState}
          className={`group ml-[6px] grid cursor-pointer grid-cols-[48px_48px_1fr] items-center gap-[6px] rounded-full pl-[5px] pr-3 py-[5px] transition-colors ${
            isSelected || isPlaying ? "bg-base-200/90" : "hover:bg-base-200/70"
          }`}
          style={{ touchAction: "pan-y" }}
        >
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <img
              src={track.creatorAvatar}
              alt={`${track.creator} avatar`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="relative h-12 w-12 overflow-hidden rounded-[4px]">
            <img
              src={track.thumbnail}
              alt={`${track.title} cover art`}
              className="h-12 w-12 object-cover shadow-sm"
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
            {showPlayOverlay ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/24">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/58 text-white shadow-sm">
                  <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                </div>
              </div>
            ) : null}
          </div>

          <div className="min-w-0 pr-1">
            <div className="flex min-w-0 items-center gap-1">
              <p className="truncate text-sm font-semibold text-base-content">{track.title}</p>
              <span aria-hidden="true" className="text-base leading-none text-black">
                *
              </span>
              {track.mixTitle ? (
                <span className="truncate text-sm font-semibold text-base-content/85">
                  {track.mixTitle}
                </span>
              ) : null}
            </div>
            <div className="mt-0.5">
              <p className="truncate text-xs text-base-content/62">
                {showCreatorInSubtitle ? `${track.artist} \u2022 ${track.creator}` : track.artist}
              </p>
            </div>
          </div>
        </div>

        {showVersionArrows ? (
          <button
            type="button"
            aria-label={`Next version for ${track.title}`}
            className="absolute -right-4 top-1/2 z-10 flex h-6 w-4 -translate-y-1/2 items-center justify-center text-base-content/35"
            onClick={(event) => {
              event.stopPropagation();
              onVersionSwipe(track.id, "next");
            }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className={triangleClassName}>
              <path d="M8 6v12l8-6-8-6Z" />
            </svg>
          </button>
        ) : null}
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-square h-10 min-h-0 w-10 justify-self-end rounded-full text-base-content/65"
        aria-label={`Open menu for ${track.title}`}
        onClick={(event) => {
          event.stopPropagation();
          onOpenMenu(track);
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <EllipsisVertical className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}

export default TrackRow;
