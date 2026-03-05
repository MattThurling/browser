function buildWaveDelays(count) {
  return Array.from({ length: count }, (_, index) => `${(index * 0.08).toFixed(2)}s`);
}

const WAVE_SAMPLE_COUNT = 6;

function TrackRow({ track, isPlaying, onSelect, profile }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(track);
    }
  };

  const waveDelays = buildWaveDelays(WAVE_SAMPLE_COUNT);

  return (
    <li
      role="button"
      tabIndex={0}
      aria-pressed={isPlaying}
      onClick={() => onSelect(track)}
      onKeyDown={handleKeyDown}
      className={`group grid cursor-pointer grid-cols-[56px_1fr_36px_24px] items-center gap-3 rounded-2xl px-2 py-2 transition-colors ${
        isPlaying ? "bg-base-200/90" : "hover:bg-base-200/80"
      }`}
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-xl">
        <img
          src={track.thumbnail}
          alt={`${track.title} cover art`}
          className="h-14 w-14 object-cover shadow-sm"
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
          <span
            aria-hidden="true"
            className={`text-base leading-none ${track.creator === "JP" ? "text-blue-500" : "text-black"}`}
          >
            *
          </span>
        </div>
        <div className="mt-0.5">
          <p className="truncate text-xs text-base-content/70">{track.artist}</p>
        </div>
      </div>

      <div className="avatar justify-self-end">
        <div className="w-9 rounded-full ring ring-base-200 ring-offset-1">
          <img src={track.creatorAvatar} alt={`${track.creator} avatar`} loading="lazy" />
        </div>
      </div>

      <button
        type="button"
        className="btn btn-ghost btn-xs btn-square text-lg leading-none text-base-content/60"
        aria-label={`Open menu for ${track.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        ⋮
      </button>
    </li>
  );
}

export default TrackRow;
