import { AudioLines, Music2, Share2 } from "lucide-react";

const MENU_ITEMS = [
  { id: "song-view", label: "Song View", icon: Music2 },
  { id: "stem-view", label: "Stem View", icon: AudioLines },
  { id: "share", label: "Share", icon: Share2 }
];

function TrackOptionsOverlay({ open, track, onClose }) {
  if (!open || !track) {
    return null;
  }

  return (
    <aside className="absolute inset-0 z-[60] flex flex-col bg-white px-6 pb-10 pt-10">
      <div className="mt-auto">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[6px] bg-[#e6e7ea]">
            <img
              src={track.thumbnail}
              alt={`${track.title} cover art`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1">
              <p className="truncate text-sm font-semibold leading-tight text-[#121417]">
                {track.title}
              </p>
              <span aria-hidden="true" className="text-sm leading-none text-black">
                *
              </span>
            </div>
            <p className="mt-1 truncate text-xs leading-tight text-[#363b43]">{track.artist}</p>
            {track.mixTitle ? (
              <p className="mt-1 truncate text-xs leading-tight text-[#363b43]">{track.mixTitle}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#e6e7ea]">
            <img
              src={track.creatorAvatar}
              alt={`${track.creator} avatar`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-[#121417]">
              {track.creator}
            </p>
          </div>
        </div>

        <ul className="mt-14 space-y-8">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-6 text-left text-[18px] font-semibold text-[#16191d]"
                >
                  <span className="flex h-7 w-7 items-center justify-center text-[#c8ccd2]">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={onClose}
          className="mt-16 block w-full text-center text-[18px] font-semibold text-[#121417]"
        >
          Cancel
        </button>
      </div>
    </aside>
  );
}

export default TrackOptionsOverlay;
