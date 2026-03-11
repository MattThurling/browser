import { ChevronLeft, Ellipsis, Search } from "lucide-react";

function FilterBar({ query, onQueryChange, onMenuClick }) {
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
          placeholder="Search tracks or artists"
          className="grow"
        />
      </label>
    </div>
  );
}

export default FilterBar;
