import { ChevronLeft, Ellipsis, Search } from "lucide-react";

function FilterBar({ query, onQueryChange, onMenuClick, versioners }) {
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

      <label className="input input-bordered input-sm flex items-center gap-2 rounded-xl">
        <Search className="h-4 w-4 text-base-content/50" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search tracks, artists, or creators"
          className="grow"
        />
      </label>

      <div className="-mx-1 mt-4 overflow-x-auto pb-1">
        <ul className="flex min-w-max items-center gap-3 px-1">
          {versioners.map((versioner) => (
            <li
              key={versioner.name}
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full"
              title={versioner.name}
            >
              <img
                src={versioner.avatar}
                alt={versioner.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterBar;
