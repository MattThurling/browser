import { ChevronLeft, Ellipsis, Search } from "lucide-react";

function FilterBar({ query, onQueryChange, onMenuClick, versioners, activeVersionerId }) {
  return (
    <div className="sticky top-0 z-20 border-b border-base-200 bg-base-100/95 px-4 py-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Back"
          className="btn btn-ghost btn-sm btn-square rounded-lg text-base-content/70"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="More options"
          className="btn btn-ghost btn-sm btn-square rounded-lg text-base-content/70"
          onClick={onMenuClick}
        >
          <Ellipsis className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <label className="flex h-12 items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 text-base">
        <Search className="h-4 w-4 shrink-0 text-base-content/45" aria-hidden="true" />
        <input
          aria-label="Search tracks, artists, or creators"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="grow bg-transparent text-[16px] outline-none"
        />
      </label>

      <div className="-mx-1 mt-4 overflow-x-auto py-2">
        <ul className="flex min-w-max items-center gap-3 px-1">
          {versioners.map((versioner) => (
            <li key={versioner.id} title={versioner.name}>
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all ${
                  versioner.id === activeVersionerId
                    ? "shadow-[0_0_0_2px_rgba(88,214,205,0.85),0_0_0_6px_rgba(88,214,205,0.18)]"
                    : ""
                }`}
              >
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={versioner.avatar}
                    alt={versioner.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterBar;
