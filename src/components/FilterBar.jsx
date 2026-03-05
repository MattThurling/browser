function FilterBar({ query, onQueryChange }) {
  return (
    <div className="sticky top-0 z-20 border-b border-base-200 bg-base-100/95 px-4 py-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Back"
          className="btn btn-ghost btn-sm btn-square rounded-lg text-base-content/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="More options"
          className="btn btn-ghost btn-sm btn-square rounded-lg text-base-content/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="5" cy="12" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="19" cy="12" r="1.8" />
          </svg>
        </button>
      </div>

      <label className="input input-bordered input-sm flex items-center gap-2 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4 text-base-content/50"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
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
